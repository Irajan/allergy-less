const MOCK_ALLERGIES = [
  {
    id: 1,
    name: 'Hay fever',
    severity: 'LOW',
    imageUrl: 'https://picsum.photos/700',
    user: {
      id: 1,
      avatarUrl: 'https://picsum.pho/700',
      firstName: 'Irajan',
      lastName: 'Dhakal',
    },
    symptoms: [
      {
        id: 1,
        description: 'High blood pressure',
      },
      {
        id: 2,
        description: 'Increase sugar level',
      },
      {
        id: null,
        description: 'Enurmous head pain',
      },
    ],
    suggestions: [
      {
        id: 1,
        description: 'Try bashar pani',
      },
    ],
  },
  {
    id: 2,
    name: 'Hay fever',
    severity: 'CRITICAL',
    imageUrl: 'https://picsum.photos/700',
    user: {
      id: 1,
      avatarUrl: 'https://picsum.photos/700',
      firstName: 'Irajan',
      lastName: 'Dhakal',
    },
  },
];

export const fetchAllergies = async () => {
  return MOCK_ALLERGIES;
};

export const fetchAllergy = async id => {
  return MOCK_ALLERGIES.find(allergy => allergy.id === id);
};
