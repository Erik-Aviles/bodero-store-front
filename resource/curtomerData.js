export const customerInfo = {
  name: 'John',
  lastname: 'Doe',
  email: 'johndoe@example.com',
  idDocument: '1205989641',
  phone: '+123456789',
  dateOfBirth: '1988-08-28',
  gender: 'femenino',
  billingAddress: {
    name: 'Juan ',
    lastname: 'Pérez',
    idDocument: '00000',
    email: '',
    country: { name: 'Ecuador', isoCode: 'EC' },
    province: { name: 'Los Ríos', isoCode: 'R' },
    canton: 'Quevedo',
    address: '',
    phone: '+34 600 123 456',
  },
  shippingAddress: {
    name: 'Juan ',
    lastname: 'Pérez',
    idDocument: '000',
    email: '',
    country: { name: 'Ecuador', isoCode: 'EC' },
    province: { name: 'Los Ríos', isoCode: 'R' },
    canton: 'Quevedo',
    address: 'Calle Verdadera 456',
    phone: '+34 600 123 456',
  },
}

export const recentOrders = [
  {
    id: 1,
    orderNumber: 1,
    date: '2024-12-01',
    address: 'Calle Comercial 789, Valencia, España',
    total: '€150.00',
    status: 'Enviado',
  },
  {
    id: 2,
    orderNumber: 2,
    date: '2024-11-15',
    address: 'Calle Comercial 789, Valencia, España',
    total: '€80.00',
    status: 'Entregado',
  },
  {
    id: 3,
    orderNumber: 3,
    date: '2024-10-30',
    address: 'Calle Comercial 789, Valencia, España',
    total: '€200.00',
    status: 'Pendiente',
  },
  {
    id: 4,
    orderNumber: 4,
    date: '2024-10-30',
    address: 'Calle Comercial 789, Valencia, España',
    total: '€200.00',
    status: 'Pendiente',
  },
  {
    id: 5,
    orderNumber: 5,
    date: '2024-10-30',
    address: 'Calle Comercial 789, Valencia, España',
    total: '€200.00',
    status: 'Pendiente',
  },
]
export const genersData = [
  {
    value: 1,
    name: 'femenino',
  },
  {
    value: 2,
    name: 'masculino',
  },
  {
    value: 3,
    name: 'otro',
  },
]
