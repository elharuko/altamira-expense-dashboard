import { supabase } from '../lib/supabase'

export interface InvoiceItem {
    name: string
    quantity: number
    unit_price: number
    total_price: number
}

export interface ElectronicInvoice {
    id: string
    business_name: string
    issuer_ruc: string
    items: InvoiceItem[]
    subtotal_amount: number
    total_amount: number
    issue_date: string
    created_at: string
}

/**
 * Obtener todas las facturas electrónicas
 */
export async function getElectronicInvoices(): Promise<ElectronicInvoice[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching invoices:', error)
            return null
        }

        return data as ElectronicInvoice[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Obtener una factura electrónica por ID
 */
export async function getElectronicInvoiceById(id: string): Promise<ElectronicInvoice | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching invoice:', error)
            return null
        }

        return data as ElectronicInvoice
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Filtrar facturas por RUC
 */
export async function getInvoicesByRuc(ruc: string): Promise<ElectronicInvoice[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .eq('issuer_ruc', ruc)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching invoices by RUC:', error)
            return null
        }

        return data as ElectronicInvoice[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Buscar facturas por nombre de empresa
 */
export async function searchInvoicesByBusinessName(businessName: string): Promise<ElectronicInvoice[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .ilike('business_name', `%${businessName}%`)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error searching invoices:', error)
            return null
        }

        return data as ElectronicInvoice[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}
