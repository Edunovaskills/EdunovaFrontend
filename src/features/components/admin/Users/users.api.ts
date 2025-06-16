export interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Krishna', 'Ishaan', 'Rohan', 'Aryan', 'Karthik', 'Anirudh',
  'Aanya', 'Diya', 'Ira', 'Kiara', 'Myra', 'Riya', 'Saanvi', 'Anaya', 'Avni', 'Meera',
  'Aarohi', 'Ishita', 'Navya', 'Tanya', 'Pihu', 'Shreya', 'Nitya', 'Prisha', 'Ruhi', 'Anika'
];

const lastNames = [
  'Sharma', 'Verma', 'Singh', 'Patel', 'Yadav', 'Reddy', 'Kumar', 'Das', 'Mehta', 'Chopra',
  'Kapoor', 'Malhotra', 'Rastogi', 'Bansal', 'Joshi', 'Agarwal', 'Gupta', 'Mishra', 'Tripathi', 'Pandey',
  'Chaudhary', 'Goswami', 'Bhattacharya', 'Naidu', 'Shetty', 'Pillai', 'Kulkarni', 'Deshmukh', 'Rana', 'Nair'
];


  const users: User[] = [];

  for (let i = 1; i <= 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
    const year = Math.random() < 0.5 ? 2024 : 2025;
    const month = Math.floor(Math.random() * 9) + 1; // 1-9
    const day = Math.floor(Math.random() * 28) + 1; // 1-28
    const joinDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    users.push({
      id: i,
      name,
      email,
      joinDate,
    });
  }

  return users;
};