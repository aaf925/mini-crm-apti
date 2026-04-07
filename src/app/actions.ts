'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { VendorStatus } from '@prisma/client'

export async function getVendors() {
  try {
    const vendors = await prisma.erpVendor.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return vendors
  } catch (error) {
    console.error("Error fetching vendors:", error)
    throw new Error('Error al obtener los proveedores')
  }
}

export async function createVendor(data: any) {
  try {
    await prisma.erpVendor.create({
      data: {
        companyName: data.companyName,
        softwareProposed: data.softwareProposed,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        status: data.status as VendorStatus,
        estimatedCost: data.estimatedCost ? parseFloat(data.estimatedCost) : null,
        estimatedMonths: data.estimatedMonths ? parseFloat(data.estimatedMonths) : null,
        hostingType: data.hostingType,
        internalOwner: data.internalOwner,
        notes: data.notes,
      }
    })

    revalidatePath('/')
  } catch (error) {
    console.error("Error creating vendor:", error)
    throw new Error('Error al registrar el proveedor')
  }
}
