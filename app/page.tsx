'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import Tiptap from '@/components/Tiptap'

export default function Home() {
    const formSchema = z.object({
        message: z.string().min(1, 'Message cannot be empty.')
            .max(255, 'Message cannot be more than 255 characters.').trim(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'onChange',
        defaultValues: {
            message: '',
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <main className="items-center p-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField render={({field})=> (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                            <Tiptap message={field.value} onChange={field.onChange}></Tiptap>
                        </FormControl>
                    </FormItem>
                )} name='message'></FormField>
                    <Button className="my-1" type="submit">Send</Button>
                </form>
            </Form>
        </main>
    )
};
