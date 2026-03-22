'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createAboutUs(form: FormData) {
    const { error } = await api('POST', '/about-us', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/about-us')
}

export async function updateAboutUs(form: FormData) {
    const { error } = await api('POST', `/about-us/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/about-us')
}
