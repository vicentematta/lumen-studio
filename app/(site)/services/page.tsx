import type { Metadata } from 'next'
import { getServices } from '@/lib/queries/services'
import { ServicesView } from '@/views/ServicesView'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Tres puertas a tu categoría: estrategia comercial, identidad digital y producción continua. Un solo método amarrado a la posición.',
}

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesView services={services} />
}
