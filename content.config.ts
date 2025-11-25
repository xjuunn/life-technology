import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const commonSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
})

export default defineContentConfig({
    collections: {
        intro: defineCollection({
            type: 'page',
            schema: commonSchema,
            source: { include: 'intro/**', prefix: '' },
        }),
        // content_en: defineCollection({
        //     type: 'page',
        //     schema: commonSchema,
        //     source: { include: 'en/**', prefix: '' },
        // }),
        // content_zh_CN: defineCollection({
        //     type: 'page',
        //     schema: commonSchema,
        //     source: { include: 'zh_CN/**', prefix: '' },
        // }),
        // content_zh_TW: defineCollection({
        //     type: 'page',
        //     schema: commonSchema,
        //     source: { include: 'zh_TW/**', prefix: '' },
        // }),
    },
})
