

import React, { useState, useEffect, useCallback } from 'react';
import { addCourseStyles } from './styles.component';
import { Course } from './mock/mockCourses';
import { courseApi } from './api/course.api';

interface AddCourseProps {}

export const AddCourse: React.FC<AddCourseProps> = () => {
  const defaultCourse: Omit<Course, 'id'> = {
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    category: 'programming',
    price: 0,
    maxStudents: 0,
    prerequisites: '',
    syllabus: '',
    imageUrl: '',
  };

  const [course, setCourse] = useState<Omit<Course, 'id'>>(() => {
    const savedCourse = localStorage.getItem('courseData');
    const parsed = savedCourse ? JSON.parse(savedCourse) : defaultCourse;
    if (parsed.id) delete parsed.id;
    return parsed;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(() => {
    return localStorage.getItem('courseImagePreview') || null;
  });
  const [isImageHovered, setIsImageHovered] = useState(false);

  // State for course list and pagination
  const [courses, setCourses] = useState<Course[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingCourses, setIsFetchingCourses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const limit = 9;

  // State for view preference
  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
    return (localStorage.getItem('courseView') as 'table' | 'grid') || 'table';
  });

  // Save form data to localStorage on changes
  useEffect(() => {
    localStorage.setItem('courseData', JSON.stringify(course));
  }, [course]);

  // Save image preview to localStorage
  useEffect(() => {
    if (preview) {
      localStorage.setItem('courseImagePreview', preview);
    } else {
      localStorage.removeItem('courseImagePreview');
    }
  }, [preview]);

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('courseView', currentView);
  }, [currentView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const courseDataToSubmit = {
        ...course,
        imageUrl: preview || '',
      };

      const createdCourse = await courseApi.createCourse(courseDataToSubmit, image);
      console.log('Course created successfully:', createdCourse);
      alert('Course created successfully!');
      setCourse(defaultCourse);
      setImage(null);
      setPreview(null);
      localStorage.removeItem('courseData');
      localStorage.removeItem('courseImagePreview');
      await fetchCoursesPage(1, true);
    } catch (error: any) {
      console.error('Error creating course:', error);
      alert(`Error creating course: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'maxStudents' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const theme = document.body.getAttribute('data-theme') || 'light';

  // Helper function to apply styles, considering the theme
  const getThemedStyle = (baseStyle: any): React.CSSProperties => {
    if (!baseStyle) {
      return {};
    }
    const styleToApply: React.CSSProperties = { ...baseStyle };

    if (theme === 'dark' && baseStyle['&[data-theme="dark"]']) {
      Object.assign(styleToApply, baseStyle['&[data-theme="dark"]']);
    }

    const filteredStyle: React.CSSProperties = {};
    for (const key in styleToApply) {
      if (
        Object.prototype.hasOwnProperty.call(styleToApply, key) &&
        !key.startsWith('@media') &&
        !key.startsWith('&') &&
        !(typeof styleToApply[key as keyof React.CSSProperties] === 'object' && !Array.isArray(styleToApply[key as keyof React.CSSProperties]))
      ) {
        filteredStyle[key as keyof React.CSSProperties] = styleToApply[key as keyof React.CSSProperties];
      }
    }
    return filteredStyle;
  };

  const fetchCoursesPage = useCallback(
    async (page: number, resetPagination: boolean = false) => {
      setIsFetchingCourses(true);
      try {
        // For page 1 or reset, start fresh
        const cursorToUse = resetPagination || page === 1 ? null : nextCursor;
        const response = await courseApi.fetchCourses(limit, cursorToUse);

        setCourses(response.courses);
        setNextCursor(response.nextCursor);
        setHasMore(response.hasMore);
        setCurrentPage(page);
        
        // Estimate total pages (this is a rough estimate for cursor-based pagination)
        const estimatedTotalPages = Math.max(page, hasMore ? page + 1 : page);
        setTotalPages(estimatedTotalPages);
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert(`Failed to load courses: ${error instanceof Error ? error.message : String(error)}. Please try again later.`);
      } finally {
        setIsFetchingCourses(false);
      }
    },
    [limit, nextCursor, hasMore]
  );

  useEffect(() => {
    fetchCoursesPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (isFetchingCourses || page < 1) return;

    if (page === 1) {
      // Always reset to start for page 1
      fetchCoursesPage(1, true);
    } else if (page > currentPage && hasMore) {
      // Going to next page
      fetchCoursesPage(page);
    } else if (page < currentPage) {
      // For previous pages, we'll go back to page 1 (limitation of cursor-based pagination)
      // In a real app, you'd need to implement bidirectional cursors
      fetchCoursesPage(1, true);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'page-number-active' : 'page-number'}
          style={
            i === currentPage
              ? getThemedStyle(addCourseStyles.pageNumberActive)
              : getThemedStyle(addCourseStyles.pageNumber)
          }
        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <style>{`
        .course-container * {
          box-sizing: border-box;
        }
        
        .course-input:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .course-textarea:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .course-select:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: ${theme === 'dark' ? '#4f46e5' : '#4338ca'};
        }
        
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .image-preview-container:hover {
          border-color: ${theme === 'dark' ? '#6366f1' : '#4f46e5'};
        }
        
        .remove-button:hover {
          background-color: #b91c1c;
        }
        
        .view-toggle-button:hover {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
        
        .course-tr:nth-of-type(even) {
          background-color: ${theme === 'dark' ? '#334155' : '#f1f5f9'};
        }
        
        .course-tr:hover {
          background-color: ${theme === 'dark' ? '#475569' : '#e2e8f0'};
        }
        
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: ${theme === 'dark' ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 8px 25px rgba(0, 0, 0, 0.12)'};
        }
        
        .card-link:hover {
          color: ${theme === 'dark' ? '#818cf8' : '#4338ca'};
        }
        
        .card-link:hover svg {
          stroke: ${theme === 'dark' ? '#818cf8' : '#4338ca'};
        }
        
        .pagination-button:hover:not(:disabled) {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
        
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: ${theme === 'dark' ? '#3b5470' : '#f1f5f9'};
        }
        
        .page-number:hover {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
      `}</style>
      
      <div className="course-container" style={getThemedStyle(addCourseStyles.container)}>
        <h2 style={getThemedStyle(addCourseStyles.title)}>Add New Course</h2>

        <form onSubmit={handleSubmit} style={getThemedStyle(addCourseStyles.form)}>
          <div style={addCourseStyles.row}>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Title</label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
                required
              />
            </div>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Instructor</label>
              <input
                type="text"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
                required
              />
            </div>
          </div>

          <div style={addCourseStyles.field}>
            <label style={getThemedStyle(addCourseStyles.label)}>Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="course-textarea"
              style={getThemedStyle(addCourseStyles.textarea)}
              rows={3}
              required
            />
          </div>

          <div style={addCourseStyles.row}>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Duration</label>
              <input
                type="text"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
                required
              />
            </div>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Level</label>
              <select
                name="level"
                value={course.level}
                onChange={handleChange}
                className="course-select"
                style={getThemedStyle(addCourseStyles.select)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div style={addCourseStyles.row}>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Category</label>
              <select
                name="category"
                value={course.category}
                onChange={handleChange}
                className="course-select"
                style={getThemedStyle(addCourseStyles.select)}
              >
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="data-science">Data Science</option>
                <option value="cybersecurity">Cybersecurity</option>
              </select>
            </div>
            <div style={addCourseStyles.field}>
              <label style={getThemedStyle(addCourseStyles.label)}>Max Students</label>
              <input
                type="number"
                name="maxStudents"
                value={course.maxStudents}
                onChange={handleChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
                min="1"
                required
              />
            </div>
          </div>

          <div style={addCourseStyles.field}>
            <label style={getThemedStyle(addCourseStyles.label)}>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="course-input"
              style={getThemedStyle(addCourseStyles.input)}
              min="0"
              required
            />
          </div>

          <div style={addCourseStyles.field}>
            <label style={getThemedStyle(addCourseStyles.label)}>Syllabus</label>
            <textarea
              name="syllabus"
              value={course.syllabus}
              onChange={handleChange}
              className="course-textarea"
              style={getThemedStyle(addCourseStyles.textarea)}
              rows={3}
              required
            />
          </div>

          <div style={addCourseStyles.field}>
            <label style={getThemedStyle(addCourseStyles.label)}>Thumbnail</label>
            {!preview ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
              />
            ) : (
              <div
                className="image-preview-container"
                style={getThemedStyle(addCourseStyles.imagePreviewContainer)}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <img src={preview} alt="Course Thumbnail Preview" style={addCourseStyles.imagePreview} />
                <div
                  style={{ ...getThemedStyle(addCourseStyles.imageOverlay), opacity: isImageHovered ? 1 : 0 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                    className="remove-button"
                    style={getThemedStyle(addCourseStyles.removeButton)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="submit-button"
            style={getThemedStyle(addCourseStyles.submitButton)}
          >
            {isLoading ? 'Creating...' : 'Create Course'}
          </button>
        </form>

        {/* Course List Section */}
        <div style={getThemedStyle(addCourseStyles.courseListSection)}>
          <h2 style={getThemedStyle(addCourseStyles.title)}>All Courses</h2>

          {/* View Toggle Buttons */}
          <div style={addCourseStyles.viewToggleContainer}>
            <button
              onClick={() => setCurrentView('table')}
              className="view-toggle-button"
              style={getThemedStyle(
                currentView === 'table' ? addCourseStyles.viewToggleButtonActive : addCourseStyles.viewToggleButton
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
              Table View
            </button>
            <button
              onClick={() => setCurrentView('grid')}
              className="view-toggle-button"
              style={getThemedStyle(
                currentView === 'grid' ? addCourseStyles.viewToggleButtonActive : addCourseStyles.viewToggleButton
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Grid View
            </button>
          </div>

          {isFetchingCourses ? (
            <div style={getThemedStyle(addCourseStyles.loading)}>
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div style={getThemedStyle(addCourseStyles.empty)}>
              No courses found. Add some to get started!
            </div>
          ) : (
            <>
              {currentView === 'table' ? (
                <table style={addCourseStyles.table}>
                  <thead>
                    <tr>
                      <th style={getThemedStyle(addCourseStyles.th)}>Title</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Instructor</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Category</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Price</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((courseItem) => (
                      <tr key={courseItem.id} className="course-tr" style={getThemedStyle(addCourseStyles.tr)}>
                        <td style={getThemedStyle(addCourseStyles.td)}>{courseItem.title}</td>
                        <td style={getThemedStyle(addCourseStyles.td)}>{courseItem.instructor}</td>
                        <td style={getThemedStyle(addCourseStyles.td)}>{courseItem.category}</td>
                        <td style={getThemedStyle(addCourseStyles.td)}>₹{courseItem.price.toFixed(2)}</td>
                        <td style={getThemedStyle(addCourseStyles.td)}>{courseItem.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={addCourseStyles.gridContainer}>
                  {courses.map((courseItem) => (
                    <div key={courseItem.id} className="course-card" style={getThemedStyle(addCourseStyles.courseCard)}>
                      <div style={addCourseStyles.cardImageWrapper}>
                        <img
                          src={courseItem.imageUrl || 'https://via.placeholder.com/400x250?text=Course+Image'}
                          alt={courseItem.title}
                          style={addCourseStyles.cardImage}
                        />
                      </div>
                      <div style={getThemedStyle(addCourseStyles.cardContent)}>
                        <h3 style={getThemedStyle(addCourseStyles.cardTitle)}>{courseItem.title}</h3>
                        <p style={{...getThemedStyle(addCourseStyles.cardDetail), display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <img
                            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${encodeURIComponent(courseItem.instructor || 'instructor')}`}
                            alt="Instructor Avatar"
                            style={addCourseStyles.instructorAvatar}
                          />
                          {courseItem.instructor}
                        </p>
                        <p style={getThemedStyle(addCourseStyles.cardDetail)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {courseItem.duration}
                        </p>
                        <p style={getThemedStyle(addCourseStyles.cardDescription)}>
                          {courseItem.description}
                        </p>
                        <div style={getThemedStyle(addCourseStyles.cardFooter)}>
                          <span>₹{courseItem.price.toFixed(2)}</span>
                          <a href="#" className="card-link" style={getThemedStyle(addCourseStyles.cardLink)}>
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              <div style={addCourseStyles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={isFetchingCourses || currentPage === 1}
                  className="pagination-button"
                  style={getThemedStyle(addCourseStyles.paginationButton)}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={isFetchingCourses || !hasMore}
                  className="pagination-button"
                  style={getThemedStyle(addCourseStyles.paginationButton)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};