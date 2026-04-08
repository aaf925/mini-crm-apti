'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signOut } from "@/auth"

export async function handleSignOut() {
  await signOut({ redirectTo: "/login" })
}

export type VendorStatusType = 
  | "IDENTIFICADO"
  | "PRIMERA_REUNION"
  | "DEMO_REALIZADA"
  | "ESPERANDO_PRESUPUESTO"
  | "PRESUPUESTO_RECIBIDO"
  | "NEGOCIANDO"
  | "SELECCIONADO"
  | "DESCARTADO";

export interface VendorData {
  companyName: string;
  softwareProposed: string;
  contactName: string;
  email: string;
  phone: string;
  status: VendorStatusType;
  estimatedCost?: string | number | null;
  estimatedMonths?: string | number | null;
  hostingType?: string | null;
  internalOwner: string;
  notes?: string | null;
  technicalFit?: number;
  scalability?: number;
  postSaleSupport?: number;
  pricingValue?: number;
}

export async function getVendors() {
  try {
    return await prisma.erpVendor.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Error fetching vendors:", error)
    throw new Error('Error al obtener los proveedores')
  }
}

export async function getVendorById(id: string) {
  try {
    return await prisma.erpVendor.findUnique({
      where: { id },
      include: { timeline: { orderBy: { date: 'desc' } } }
    })
  } catch (error) {
    console.error("Error fetching vendor:", error)
    throw new Error('Error al obtener el proveedor')
  }
}

export async function createVendor(data: VendorData) {
  try {
    const result = await prisma.erpVendor.create({
      data: {
        companyName: data.companyName,
        softwareProposed: data.softwareProposed,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        status: data.status,
        estimatedCost: data.estimatedCost ? parseFloat(data.estimatedCost.toString()) : null,
        estimatedMonths: data.estimatedMonths ? parseFloat(data.estimatedMonths.toString()) : null,
        hostingType: data.hostingType,
        internalOwner: data.internalOwner,
        notes: data.notes,
        technicalFit: data.technicalFit || 0,
        scalability: data.scalability || 0,
        postSaleSupport: data.postSaleSupport || 0,
        pricingValue: data.pricingValue || 0,
        timeline: {
          create: {
            title: "Proceso Iniciado",
            description: "Registro inicial de la consultora en el sistema Nexus.",
            icon: "clinical_notes",
            status: "IDENTIFICADO"
          }
        }
      }
    })

    revalidatePath('/')
    revalidatePath('/evaluations')
    return result
  } catch (error) {
    console.error("Error creating vendor:", error)
    throw new Error('Error al registrar el proveedor')
  }
}

export async function updateVendor(id: string, data: VendorData) {
  try {
    const result = await prisma.erpVendor.update({
      where: { id },
      data: {
        companyName: data.companyName,
        softwareProposed: data.softwareProposed,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        status: data.status,
        estimatedCost: data.estimatedCost ? parseFloat(data.estimatedCost.toString()) : null,
        estimatedMonths: data.estimatedMonths ? parseFloat(data.estimatedMonths.toString()) : null,
        hostingType: data.hostingType,
        internalOwner: data.internalOwner,
        notes: data.notes,
        technicalFit: data.technicalFit,
        scalability: data.scalability,
        postSaleSupport: data.postSaleSupport,
        pricingValue: data.pricingValue,
      }
    })

    // Auto-create timeline event on status change?
    // For now we'll just revalidate
    revalidatePath('/')
    revalidatePath('/evaluations')
    revalidatePath(`/vendors/${id}`)
    revalidatePath('/integrators')
    return result
  } catch (error) {
    console.error("Error updating vendor:", error)
    throw new Error('Error al actualizar el proveedor')
  }
}

export async function deleteVendor(id: string) {
  try {
    await prisma.erpVendor.delete({
      where: { id }
    })

    revalidatePath('/')
    revalidatePath('/evaluations')
  } catch (error) {
    console.error("Error deleting vendor:", error)
    throw new Error('Error al eliminar el proveedor')
  }
}
export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const department = formData.get('department') as string
  const role = formData.get('role') as string

  if (!email || !password) throw new Error("Email and password required")

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role: role || "USER"
      }
    })
    return { success: true, user: { email: user.email } }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Email already exists or database error" }
  }
}

export async function createTimelineEvent(vendorId: string, data: { title: string, description?: string, icon?: string, status?: string }) {
  try {
    const event = await prisma.timelineEvent.create({
      data: {
        vendorId,
        ...data
      }
    })
    revalidatePath(`/vendors/${vendorId}`)
    return event
  } catch (error) {
    console.error("Error creating timeline event:", error)
    throw new Error('Error al crear el evento de la línea de tiempo')
  }
}
