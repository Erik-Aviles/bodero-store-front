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
    email: 'eri@gmail.com',
    country: { name: 'Ecuador', isoCode: 'EC' },
    province: { name: 'Los Ríos', isoCode: 'R' },
    canton: 'Quevedo',
    address: 'Calle Verdadera 456',
    phone: '+34 600 123 456',
  },
  shippingAddress: {
    name: 'Juan ',
    lastname: 'Pérez',
    idDocument: '000',
    email: 'patri@gmail.com',
    country: { name: 'Ecuador', isoCode: 'EC' },
    province: { name: 'Los Ríos', isoCode: 'R' },
    canton: 'Babahoyo',
    address: 'Calle Verdadera 456',
    phone: '+1 600 123 890',
  },
  orders: [
    {
      id: 1,
      orderNumber: 1,
      name: 'fabiola',
      lastname: 'vera',
      phone: '0986868686',
      email: 'eri@hotmail.com',
      createdAt: '2024-12-01',
      country: 'Ecuador',
      province: 'Los Rios',
      city: 'Quevedo',
      streetAddress: 'Calle rew dkdkf dfkdfk rwrwr freComercial 789',
      line_items: [
        {
          quantity: 1,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pastel',
              price: 32,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 32,
          },
        },
        {
          quantity: 4,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'lechita',
              price: 1,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
        {
          quantity: 3,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'carnita',
              price: 1.5,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4.5,
          },
        },
        {
          quantity: 2,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pancito',
              price: 2,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
      ],
      status: 'Enviado',
      paid: 'false',
    },
    {
      id: 2,
      orderNumber: 2,
      name: 'fabiola',
      lastname: 'vera',
      phone: '0986868686',
      email: 'eri@hotmail.com',
      createdAt: '2024-12-01',
      country: 'Ecuador',
      province: 'Los Rios',
      city: 'Quevedo',
      streetAddress: 'Calle rew dkdkf dfkdfk rwrwr freComercial 789',
      line_items: [
        {
          quantity: 1,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pastel',
              price: 32,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 32,
          },
        },
        {
          quantity: 4,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'lechita',
              price: 1,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
        {
          quantity: 3,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'carnita',
              price: 1.5,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4.5,
          },
        },
        {
          quantity: 2,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pancito',
              price: 2,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
      ],
      status: 'Cancelado',
      paid: 'true',
    },
    {
      id: 3,
      orderNumber: 3,
      name: 'fabiola',
      lastname: 'vera',
      phone: '0986868686',
      email: 'eri@hotmail.com',
      createdAt: '2024-12-01',
      country: 'Ecuador',
      province: 'Los Rios',
      city: 'Quevedo',
      streetAddress: 'Calle rew dkdkf dfkdfk rwrwr freComercial 789',
      line_items: [
        {
          quantity: 1,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pastel',
              price: 32,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 32,
          },
        },
        {
          quantity: 4,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'lechita',
              price: 1,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
        {
          quantity: 3,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'carnita',
              price: 1.5,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4.5,
          },
        },
        {
          quantity: 2,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pancito',
              price: 2,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
      ],
      status: 'Preparado',
      paid: 'false',
    },
    {
      id: 4,
      orderNumber: 4,
      name: 'fabiola',
      lastname: 'vera',
      phone: '0986868686',
      email: 'eri@hotmail.com',
      createdAt: '2024-12-01',
      country: 'Ecuador',
      province: 'Los Rios',
      city: 'Quevedo',
      streetAddress: 'Calle rew dkdkf dfkdfk rwrwr freComercial 789',
      line_items: [
        {
          quantity: 1,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pastel',
              price: 32,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 32,
          },
        },
        {
          quantity: 4,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'lechita',
              price: 1,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
        {
          quantity: 3,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'carnita',
              price: 1.5,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4.5,
          },
        },
        {
          quantity: 2,
          info_order: {
            currency: 'USD',
            product_data: {
              id: '12',
              name: 'pancito',
              price: 2,
              brand: 'sweet',
              code: '12',
            },
            unit_amount: 4,
          },
        },
      ],
      status: 'Entregado',
      paid: 'false',
    },
  ],
}

export const countries = [{ name: 'Ecuador', isoCode: 'EC' }]

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
