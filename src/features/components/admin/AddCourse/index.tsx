<<<<<<< Updated upstream
import React, { useState, useEffect, useCallback } from 'react';
import { addCourseStyles } from './styles.component';
import { Course, courseApi } from './api/course.api'; // Import Course interface from course.api

interface AddCourseProps {}

export const AddCourse: React.FC<AddCourseProps> = () => {
  // Initial default state for a new course, matching backend model properties
  const defaultCourse: Omit<Course, 'id' | 'image' | 'createdAt' | 'updatedAt' | 'isActive'> = {
    title: '',
    description: '',
    price: 0,
  };

  const [course, setCourse] = useState<typeof defaultCourse>(() => {
    // Attempt to load saved course data from localStorage
    const savedCourse = localStorage.getItem('courseData');
    const parsed = savedCourse ? JSON.parse(savedCourse) : defaultCourse;
    // Ensure 'image' or 'imageUrl' is not loaded from localStorage as it will be a File/URL
    if (parsed.image) delete parsed.image;
    if (parsed.imageUrl) delete parsed.imageUrl;
    return parsed;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Actual File object for upload
  const [preview, setPreview] = useState<string | null>(() => {
    // Load image preview from localStorage for persistence
    return localStorage.getItem('courseImagePreview') || null;
  });
  const [isImageHovered, setIsImageHovered] = useState(false);

  // State for course list and pagination
  const [courses, setCourses] = useState<Course[]>([]);
  const [isFetchingCourses, setIsFetchingCourses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9; // Number of courses per page
=======
// src/features/components/admin/AddCourse/index.tsx
import React, { useState, useEffect } from 'react'
import { addCourseStyles } from './styles.component'
import {
  useAllCoursesForAdminQuery,
  useCourseByIdAdminQuery, // For fetching single course details for edit
} from 'entities/query'
import { useForm, Controller } from 'react-hook-form'
import { courseSchema, type CourseSchema } from '../../../../features/schema/courses.schema' // Correct path
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from 'entities/mutation'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Alert,
  Modal,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch, // For isActive status
  TablePagination,
  InputAdornment,
  ToggleButtonGroup, // Added for view toggle
  ToggleButton, // Added for view toggle
} from '@mui/material'
import { CloudUpload, Delete, Close, Edit, Visibility, Search, TableRows, GridView } from '@mui/icons-material' // Added TableRows, GridView
import type { Course } from 'entities/model/courses.model'
import { CourseDetailModal } from 'entities/component/CourseDetailModal' // Correct path
import { ConfirmDialog } from '../../../../entities/component/ConfirmDialog'; // Assuming you have a ConfirmDialog component

interface AddCourseProps {}

// Placeholder image URL
const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400?text=Course'; // Corrected typo
>>>>>>> Stashed changes

export const AddCourse: React.FC<AddCourseProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
<<<<<<< Updated upstream
    return (localStorage.getItem('courseView') as 'table' | 'grid') || 'table';
  });

  // NEW: State to manage the course being edited
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

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

  // Effect to populate form when editingCourse changes
  useEffect(() => {
    if (editingCourse) {
      setCourse({
        title: editingCourse.title,
        description: editingCourse.description,
        price: editingCourse.price,
      });
      setPreview(editingCourse.image); // Set current image as preview
      setImageFile(null); // Clear imageFile, assume image is already on server
    } else {
      setCourse(defaultCourse);
      setImageFile(null);
      setPreview(null);
    }
    // Clear localStorage values related to the form when editing state changes
    localStorage.removeItem('courseData');
    localStorage.removeItem('courseImagePreview');
  }, [editingCourse]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Create FormData to send both text fields and the file
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('price', String(course.price));

    if (imageFile) {
      formData.append('image', imageFile); // 'image' must match the fieldName in uploadToCloudinary
    }

    try {
      let resultCourse: Course;
      if (editingCourse) {
        // If editing an existing course
        // Only send image if imageFile is new, otherwise it's handled by backend not updating image
        resultCourse = await courseApi.updateCourse(editingCourse.id, formData);
        console.log('Course updated successfully:', resultCourse);
        showMessageBox('Success!', 'Course updated successfully!', 'green');
      } else {
        // Basic validation for image presence on create
        if (!imageFile) {
          showMessageBox('Error!', 'Please upload an image for the course.', 'red');
          setIsLoading(false);
          return;
        }
        // If creating a new course
        resultCourse = await courseApi.createCourse(formData);
        console.log('Course created successfully:', resultCourse);
        showMessageBox('Success!', 'Course created successfully!', 'green');
      }
      
      setEditingCourse(null); // Clear editing state
      setCourse(defaultCourse);
      setImageFile(null);
      setPreview(null);
      localStorage.removeItem('courseData');
      localStorage.removeItem('courseImagePreview');
      await fetchCoursesPage(1); // Fetch the first page after creation/update
    } catch (error: any) {
      console.error(`Error ${editingCourse ? 'updating' : 'creating'} course:`, error);
      showMessageBox('Error!', `Error ${editingCourse ? 'updating' : 'creating'} course: ${error.message || 'Unknown error'}`, 'red');
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
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Set the actual File object
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  // NEW: Function to handle edit button click
  const handleEditClick = (courseToEdit: Course) => {
    setEditingCourse(courseToEdit);
    // Scroll to form or highlight it for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // NEW: Function to handle delete button click
  const handleDeleteClick = async (courseId: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the course "${courseTitle}"? This cannot be undone.`)) {
      setIsLoading(true); // Can use a separate loading state for delete if preferred
      try {
        await courseApi.deleteCourse(courseId);
        showMessageBox('Success!', `Course "${courseTitle}" deleted successfully!`, 'green');
        await fetchCoursesPage(currentPage); // Re-fetch current page after deletion
      } catch (error: any) {
        console.error(`Error deleting course "${courseTitle}":`, error);
        showMessageBox('Error!', `Error deleting course: ${error.message || 'Unknown error'}`, 'red');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // NEW: Function to handle "Cancel Edit" button click
  const handleCancelEdit = () => {
    setEditingCourse(null);
    setCourse(defaultCourse); // Reset form to default
    setImageFile(null);
    setPreview(null);
    localStorage.removeItem('courseData');
    localStorage.removeItem('courseImagePreview');
  };

  // Helper for custom message boxes (reused from previous version)
  const showMessageBox = (title: string, message: string, type: 'green' | 'red') => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 flex items-center justify-center z-50';
    messageBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dim background
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
        <p class="text-xl font-semibold ${type === 'green' ? 'text-green-600' : 'text-red-600'} mb-4">${title}</p>
        <p class="text-gray-700 mb-6">${message}</p>
        <button id="closeMessageBox" class="bg-${type === 'green' ? 'indigo' : 'red'}-600 text-white px-4 py-2 rounded-md hover:bg-${type === 'green' ? 'indigo' : 'red'}-700 transition-colors">OK</button>
      </div>
    `;
    document.body.appendChild(messageBox);

    document.getElementById('closeMessageBox')?.addEventListener('click', () => {
      document.body.removeChild(messageBox);
    });
  };

  const theme = document.body.getAttribute('data-theme') || 'light';

  // Helper function to apply styles, considering the theme (no changes here)
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

  // Modified fetchCoursesPage for offset-based pagination (no changes here, already correct)
  const fetchCoursesPage = useCallback(
    async (page: number) => {
      setIsFetchingCourses(true);
      try {
        const response = await courseApi.fetchCourses(limit, page);
        setCourses(response.data.courses);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching courses:', error);
        showMessageBox('Error!', `Failed to load courses: ${error instanceof Error ? error.message : String(error)}. Please try again later.`, 'red');
      } finally {
        setIsFetchingCourses(false);
      }
=======
    // Load view preference from localStorage, default to 'table'
    return (localStorage.getItem('courseView') as 'table' | 'grid') || 'table'
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [editCourseId, setEditCourseId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [courseToDeleteId, setCourseToDeleteId] = useState<string | null>(null);

  // Pagination & Search States
  const [page, setPage] = useState(0); // Material-UI TablePagination is 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(10); // Changed default to 10 for consistency with blog
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');


  // React Query Hooks
  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
    error: coursesError,
    refetch: refetchCourses,
  } = useAllCoursesForAdminQuery({ page: page + 1, limit: rowsPerPage, search: debouncedSearchQuery });

  const {
    data: singleCourseData,
    isLoading: isLoadingSingleCourse,
    // isError: isErrorSingleCourse, // Not explicitly used but good to keep in mind
    // error: singleCourseError,
  } = useCourseByIdAdminQuery(editCourseId || undefined);

  const createCourseMutation = useCreateCourseMutation()
  const updateCourseMutation = useUpdateCourseMutation()
  const deleteCourseMutation = useDeleteCourseMutation()

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchema>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
>>>>>>> Stashed changes
    },
    [limit]
  );

<<<<<<< Updated upstream
  useEffect(() => {
    fetchCoursesPage(1); // Fetch initial page on component mount
  }, [fetchCoursesPage]);

  const handlePageChange = (page: number) => {
    if (isFetchingCourses || page < 1 || page > totalPages) return;
    fetchCoursesPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
=======
  // Effect for debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  // Effect to populate form when editing a course
  useEffect(() => {
    if (editCourseId && singleCourseData?.data.course) {
      const course = singleCourseData.data.course;
      setValue('title', course.title);
      setValue('description', course.description);
      setPreview(course.image || null); // Set current image as preview
    } else if (!editCourseId) {
      reset();
      setPreview(null);
      setImageFile(null);
    }
  }, [editCourseId, singleCourseData, setValue, reset]);

  // Store view preference in localStorage
  useEffect(() => {
    localStorage.setItem('courseView', currentView);
  }, [currentView]);


  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
      setValue('image', file as any); // Cast for Yup, actual type is File
    } else {
      setImageFile(null)
      setPreview(null)
      setValue('image', undefined);
>>>>>>> Stashed changes
    }

<<<<<<< Updated upstream
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
=======
  // Handle form submission (Create or Update)
  const onSubmit = async (data: CourseSchema) => {
    try {
      if (editCourseId) {
        await updateCourseMutation.mutateAsync({
          courseId: editCourseId,
          coursePayload: {
            title: data.title,
            description: data.description,
          },
          imageFile: imageFile || undefined,
        })
      } else {
        if (!imageFile) {
          // Changed from alert to console error for better practice, as alerts are discouraged in iframes
          console.error('Please select an image for the course.');
          // Potentially show a user-friendly message in the UI instead of alert
          return // Prevent submission if no image for creation
        }
        await createCourseMutation.mutateAsync({
          course: {
            title: data.title,
            description: data.description,
          },
          imageFile,
        })
      }
      reset()
      setImageFile(null)
      setPreview(null)
      setEditCourseId(null)
      refetchCourses() // Manual refetch after mutation success
    } catch (error) {
      // Error handling is managed by react-query mutations onError callback
      console.error('Submission error:', error);
    }
  }

  // Handle edit action
  const handleEditCourse = (course: Course) => {
    setEditCourseId(course._id);
    setSelectedCourse(course); // Set selected course to populate modal if needed
    // The useEffect will handle populating the form
  }

  // Handle delete action confirmation
  const handleDeleteCourseClick = (courseId: string) => {
    setCourseToDeleteId(courseId);
    setDeleteConfirmOpen(true);
  };

  // Handle actual delete action
  const handleDeleteConfirm = async () => {
    if (courseToDeleteId) {
      await deleteCourseMutation.mutateAsync(courseToDeleteId);
      setDeleteConfirmOpen(false);
      setCourseToDeleteId(null);
      refetchCourses(); // Refetch courses after deletion
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setCourseToDeleteId(null);
  };


  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setModalOpen(true)
  }
>>>>>>> Stashed changes

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Toggle view between table and grid
  const toggleView = (event: React.MouseEvent<HTMLElement>, newView: 'table' | 'grid' | null) => {
    if (newView !== null) {
      setCurrentView(newView);
    }
  };


  const courses = coursesData?.data?.courses || []
  const totalCourses = coursesData?.total || 0;
  const totalPages = coursesData?.totalPages || 1;
  const currentPage = coursesData?.currentPage || 1;


  return (
    <>
<<<<<<< Updated upstream
      <style>{`
        /* Tailwind CSS CDN */
        @import url('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');
        /* Inter font from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

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

        /* NEW: Styles for Action Buttons */
        .action-button {
          padding: 0.4rem 0.8rem;
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.75rem; /* text-xs */
          font-weight: 500;
          transition: all 0.15s ease-in-out;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-right: 0.5rem; /* Space between buttons */
        }

        .action-button.edit-button {
          background-color: #3b82f6; /* blue-500 */
          color: white;
        }
        .action-button.edit-button:hover {
          background-color: #2563eb; /* blue-600 */
        }

        .action-button.delete-button {
          background-color: #ef4444; /* red-500 */
          color: white;
        }
        .action-button.delete-button:hover {
          background-color: #dc2626; /* red-600 */
        }

        .action-button.view-button {
          background-color: #6366f1; /* indigo-500 */
          color: white;
        }
        .action-button.view-button:hover {
          background-color: #4f46e5; /* indigo-600 */
        }
        /* Dark mode specific styles for action buttons */
        body[data-theme="dark"] .action-button.edit-button {
          background-color: #60a5fa; /* blue-400 */
          color: #1f2937; /* gray-900 */
        }
        body[data-theme="dark"] .action-button.edit-button:hover {
          background-color: #3b82f6; /* blue-500 */
        }
        body[data-theme="dark"] .action-button.delete-button {
          background-color: #f87171; /* red-400 */
          color: #1f2937;
        }
        body[data-theme="dark"] .action-button.delete-button:hover {
          background-color: #ef4444; /* red-500 */
        }
        body[data-theme="dark"] .action-button.view-button {
          background-color: #818cf8; /* indigo-400 */
          color: #1f2937;
        }
        body[data-theme="dark"] .action-button.view-button:hover {
          background-color: #6366f1; /* indigo-500 */
        }


      `}</style>
      
      <div className="course-container" style={getThemedStyle(addCourseStyles.container)}>
        <h2 style={getThemedStyle(addCourseStyles.title)}>
          {editingCourse ? 'Edit Course' : 'Add New Course'}
        </h2>

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
            <label style={getThemedStyle(addCourseStyles.label)}>Thumbnail</label>
            {!preview ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="course-input"
                style={getThemedStyle(addCourseStyles.input)}
                required={!editingCourse} // Image is required only for new course creation
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
                      setImageFile(null); // Clear the actual file
                      setPreview(null); // Clear the preview
                    }}
                    className="remove-button"
                    style={getThemedStyle(addCourseStyles.removeButton)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            )}
            {editingCourse && (
                <p style={{fontSize: '0.875rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b', marginTop: '0.5rem'}}>
                    Leave blank to keep existing image.
                </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            {editingCourse && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="submit-button" // Reuse submit button styles or create new cancel style
                style={{ ...getThemedStyle(addCourseStyles.submitButton), backgroundColor: theme === 'dark' ? '#475569' : '#64748b', hover: { backgroundColor: theme === 'dark' ? '#334155' : '#475569' } }}
              >
                Cancel Edit
              </button>
            )}
            <button 
              type="submit" 
              disabled={isLoading} 
              className="submit-button"
              style={getThemedStyle(addCourseStyles.submitButton)}
            >
              {isLoading ? (editingCourse ? 'Updating...' : 'Creating...') : (editingCourse ? 'Update Course' : 'Create Course')}
            </button>
          </div>
        </form>
=======
      <Box sx={addCourseStyles.container}>
        <Typography variant="h4" component="h1" sx={addCourseStyles.header}>
          {editCourseId ? 'Edit Course' : 'Add New Course'}
        </Typography>

        {(createCourseMutation.isError || updateCourseMutation.isError || deleteCourseMutation.isError) && (
          <Alert severity="error" sx={addCourseStyles.alert}>
            {createCourseMutation.error?.response?.data?.message ||
             updateCourseMutation.error?.response?.data?.message ||
             deleteCourseMutation.error?.response?.data?.message ||
             'An unexpected error occurred.'}
          </Alert>
        )}
        {(createCourseMutation.isSuccess || updateCourseMutation.isSuccess || deleteCourseMutation.isSuccess) && (
          <Alert severity="success" sx={addCourseStyles.alert}>
            {createCourseMutation.data?.message ||
             updateCourseMutation.data?.message ||
             deleteCourseMutation.data?.message ||
             'Operation successful!'}
          </Alert>
        )}

        {/* Course Form */}
        <Paper elevation={3} sx={addCourseStyles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Title"
                  variant="outlined"
                  fullWidth
                  sx={addCourseStyles.inputField}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  sx={addCourseStyles.inputField}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Image Upload */}
            <Box sx={addCourseStyles.imageUploadContainer}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="course-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="course-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={addCourseStyles.uploadButton}
                >
                  Upload Image
                </Button>
              </label>
              {preview && (
                <Box sx={addCourseStyles.imagePreviewBox}>
                  <img src={preview} alt="Course Preview" style={addCourseStyles.imagePreview} />
                  <IconButton
                    onClick={() => {
                      setPreview(null)
                      setImageFile(null)
                      setValue('image', undefined);
                    }}
                    sx={addCourseStyles.removeImageButton}
                  >
                    <Close />
                  </IconButton>
                </Box>
              )}
              {errors.image && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.image.message as string}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={addCourseStyles.submitButton}
              disabled={isSubmitting || createCourseMutation.isPending || updateCourseMutation.isPending}
            >
              {isSubmitting || createCourseMutation.isPending || updateCourseMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : editCourseId ? (
                'Update Course'
              ) : (
                'Create Course'
              )}
            </Button>
            {editCourseId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditCourseId(null);
                  reset();
                  setPreview(null);
                  setImageFile(null);
                }}
                sx={addCourseStyles.cancelEditButton}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </Paper>
>>>>>>> Stashed changes

        {/* Course Listing */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" sx={addCourseStyles.subHeader}>
            Existing Courses
          </Typography>

<<<<<<< Updated upstream
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
                      <th style={getThemedStyle(addCourseStyles.th)}>Description</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Price</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Image</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Actions</th> {/* NEW ACTIONS COLUMN */}
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((courseItem) => (
                      <tr key={courseItem.id} className="course-tr" style={getThemedStyle(addCourseStyles.tr)}>
                        <td style={getThemedStyle(addCourseStyles.td)} data-label="Title">{courseItem.title}</td>
                        <td style={getThemedStyle(addCourseStyles.td)} data-label="Description">{courseItem.description}</td>
                        <td style={getThemedStyle(addCourseStyles.td)} data-label="Price">₹{courseItem.price.toFixed(2)}</td>
                        <td style={getThemedStyle(addCourseStyles.td)} data-label="Image">
                          {courseItem.image ? (
                            <img src={courseItem.image} alt={courseItem.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td style={getThemedStyle(addCourseStyles.td)} data-label="Actions"> {/* NEW ACTIONS CELL */}
                          <button
                            onClick={() => handleEditClick(courseItem)}
                            className="action-button edit-button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(courseItem.id, courseItem.title)}
                            className="action-button delete-button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            Delete
                          </button>
                          <a 
                            href={`/courses/${courseItem.id}`} // Example: Link to a specific course detail page
                            className="action-button view-button"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            View
                          </a>
                        </td>
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
                          src={courseItem.image || 'https://placehold.co/400x250/E2E8F0/64748B?text=No+Image'}
                          alt={courseItem.title}
                          style={addCourseStyles.cardImage}
                        />
                      </div>
                      <div style={getThemedStyle(addCourseStyles.cardContent)}>
                        <h3 style={getThemedStyle(addCourseStyles.cardTitle)}>{courseItem.title}</h3>
                        <p style={getThemedStyle(addCourseStyles.cardDescription)}>
                          {courseItem.description}
                        </p>
                        <div style={getThemedStyle(addCourseStyles.cardFooter)}>
                          <span>₹{courseItem.price.toFixed(2)}</span>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => handleEditClick(courseItem)}
                                className="action-button edit-button"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(courseItem.id, courseItem.title)}
                                className="action-button delete-button"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                Delete
                              </button>
                              <a 
                                href={`/courses/${courseItem.id}`} 
                                className="action-button view-button"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                View
                              </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
=======
          <Box sx={addCourseStyles.searchAndSwitchContainer}>
            <TextField
              label="Search Courses"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={addCourseStyles.searchField}
            />
            <ToggleButtonGroup
              value={currentView}
              exclusive
              onChange={toggleView}
              aria-label="course view"
              sx={addCourseStyles.viewToggle}
            >
              <ToggleButton value="table" aria-label="table view">
                <TableRows />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <GridView />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {isLoadingCourses ? (
            <Box sx={addCourseStyles.loadingBox}>
              <CircularProgress />
            </Box>
          ) : isErrorCourses ? (
            <Alert severity="error" sx={addCourseStyles.alert}>Error loading courses: {coursesError?.message}</Alert>
          ) : courses.length === 0 ? (
            <Alert severity="info" sx={addCourseStyles.alert}>No courses found.</Alert>
          ) : (
            <>
              {currentView === 'table' ? (
                <TableContainer component={Paper} sx={addCourseStyles.tableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={addCourseStyles.tableHeader}>Image</TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>Title</TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>Description</TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>Created By</TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>Status</TableCell>
                        <TableCell sx={addCourseStyles.tableHeader} align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course._id} sx={addCourseStyles.tableRow}>
                          <TableCell>
                            <img
                              src={course.image || PLACEHOLDER_IMAGE_URL}
                              alt={course.title}
                              style={addCourseStyles.tableImage}
                            />
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>{course.title}</TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {course.description.length > 50
                              ? `${course.description.substring(0, 50)}...`
                              : course.description}
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {typeof course.createdBy === 'object' && course.createdBy !== null
                              ? course.createdBy.name
                              : 'Admin'}
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            <Switch
                              checked={course.isActive}
                              inputProps={{ 'aria-label': 'course active status' }}
                            />
                            {course.isActive ? 'Active' : 'Inactive'}
                          </TableCell>
                          <TableCell align="right" sx={addCourseStyles.tableCell}>
                            <Box sx={addCourseStyles.tableActions}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditCourse(course)}
                                aria-label="edit course"
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleViewCourse(course)}
                                aria-label="view course"
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteCourseClick(course._id)}
                                aria-label="delete course"
                                disabled={deleteCourseMutation.isPending}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Changed for consistency with blog
                    component="div"
                    count={totalCourses}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                <Box sx={addCourseStyles.paginationContainer}> {/* This Box now wraps the grid + pagination */}
                  <Box sx={addCourseStyles.courseGrid}>
                    {courses.map((course) => (
                      <Paper key={course._id} elevation={2} sx={addCourseStyles.courseCard}>
                        <img
                          src={course.image || PLACEHOLDER_IMAGE_URL}
                          alt={course.title}
                          style={addCourseStyles.courseCardImage}
                        />
                        <Box sx={addCourseStyles.courseCardContent}>
                          <Typography variant="h6" sx={addCourseStyles.courseCardTitle}>
                            {course.title}
                          </Typography>
                          <Typography variant="body2" sx={addCourseStyles.courseCardDescription}>
                            {course.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Status: {course.isActive ? 'Active' : 'Inactive'}
                          </Typography>
                          <Box sx={addCourseStyles.courseCardActions}>
                            <IconButton color="primary" size="small" onClick={() => handleEditCourse(course)}>
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton color="error" size="small" onClick={() => handleDeleteCourseClick(course._id)}>
                              <Delete fontSize="small" />
                            </IconButton>
                            <IconButton color="success" size="small" onClick={() => handleViewCourse(course)}>
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Changed for consistency with blog
                    component="div"
                    count={totalCourses}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
>>>>>>> Stashed changes
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
                  disabled={isFetchingCourses || currentPage === totalPages}
                  className="pagination-button"
                  style={getThemedStyle(addCourseStyles.paginationButton)}
                >
                  Next
                </button>
              </div>
            </>
          )}
<<<<<<< Updated upstream
        </div>
      </div>
=======
        </Box>
      </Box>

      {/* Course Detail Modal */}
      <CourseDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
        loading={isLoadingSingleCourse}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description="Are you sure you want to delete this course? This action cannot be undone."
        loading={deleteCourseMutation.isPending}
      />
>>>>>>> Stashed changes
    </>
  );
};