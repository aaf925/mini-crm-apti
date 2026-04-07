'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { FacilityStatus } from '@prisma/client'

export async function getFacilities() {
  try {
    const facilities = await prisma.facilityProvider.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return facilities
  } catch (error) {
    console.error("Error fetching facilities:", error)
    throw new Error('Error al obtener los proveedores')
  }
}

export async function createFacility(formData: FormData) {
  try {
    const estimatedPrice = formData.get('estimatedPricePerHour') as string;

    await prisma.facilityProvider.create({
      data: {
        name: formData.get('name') as string,
        contactName: formData.get('contactName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        status: formData.get('status') as FacilityStatus,
        pitchTypes: formData.get('pitchTypes') as string,
        estimatedPricePerHour: estimatedPrice ? parseFloat(estimatedPrice) : null,
        internalOwner: formData.get('internalOwner') as string,
        notes: formData.get('notes') as string,
      }
    })

    // Refrescar el Dashboard para mostrar el nuevo proveedor
    revalidatePath('/')
  } catch (error) {
    console.error("Error creating facility:", error)
    throw new Error('Error al crear el proveedor')
  }
}
