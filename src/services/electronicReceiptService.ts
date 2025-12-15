import { supabase } from '../lib/supabase'

export interface ReceiptItem {
    name: string
    quantity: number
    unit_price: number
    total_price: number
}

export interface ElectronicReceipt {
    id: string
    business_name: string
    issuer_ruc: string
    items: ReceiptItem[]
    subtotal_amount: number
    total_amount: number
    issue_date: string
    created_at: string
}

/**
 * Obtener todas las boletas electrónicas
 */
export async function getElectronicReceipts(): Promise<ElectronicReceipt[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching receipts:', error)
            return null
        }

        return data as ElectronicReceipt[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Obtener una boleta electrónica por ID
 */
export async function getElectronicReceiptById(id: string): Promise<ElectronicReceipt | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching receipt:', error)
            return null
        }

        return data as ElectronicReceipt
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Filtrar boletas por RUC
 */
export async function getReceiptsByRuc(ruc: string): Promise<ElectronicReceipt[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .eq('issuer_ruc', ruc)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching receipts by RUC:', error)
            return null
        }

        return data as ElectronicReceipt[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}

/**
 * Buscar boletas por nombre de empresa
 */
export async function searchReceiptsByBusinessName(businessName: string): Promise<ElectronicReceipt[] | null> {
    try {
        const { data, error } = await supabase
            .from('electronic_invoices')
            .select('id, business_name, issuer_ruc, items, subtotal_amount, total_amount, issue_date, created_at')
            .ilike('business_name', `%${businessName}%`)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error searching receipts:', error)
            return null
        }

        return data as ElectronicReceipt[]
    } catch (error) {
        console.error('Unexpected error:', error)
        return null
    }
}
