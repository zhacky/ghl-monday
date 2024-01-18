"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";
import {usePathname} from "next/navigation";
import {
    ReactEventHandler,
    SetStateAction,
    useEffect,
    useMemo, useRef,
    useState,
} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


export default function Home() {
    const pathname = usePathname();
    const [segment, setSegment] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const segments = pathname.split("/");
    const [locationKey, setLocationKey] = useState(localStorage.getItem('locationId'));
    const hidden = {
        display: 'none',
    }
    const inputRef = useRef<HTMLInputElement>(null);

    const triggerMake = async () => {
        if (!locationKey) return;
        const url = `${process.env.NEXT_PUBLIC_FETCH_TASKS_URL}`;
        const req = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "location-key": locationKey,
            },
        };
        const res = await fetch(url, req);
        if (res.ok) {
            const tasks = await res.json();
            setTasks(tasks);
        } else {

        }
    };

    const triggerSend = async (values: { locationId: string; taskId: string; message: string; }) => {
        const url = `${process.env.NEXT_PUBLIC_FETCH_REPLY_URL}`;
        const req = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }

        const res = await fetch(url, req);
        if (res.ok) {
            const results = await res.json();
            console.log(results);
        } else {
            console.log("An error occurred while fetching");
        }
    };

    const formSchema = z.object({
        locationId: z
            .string(),
        taskId: z
            .string(),
        message: z
            .string()
            .min(1, "Message cannot be empty.")
            .max(255, "Message cannot be more than 255 characters.")
            .trim(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            locationId: "",
            taskId: "",
            message: "",
        },
    });

    async function handleConnect() {

        const apiKey = inputRef.current?.value;
        if (apiKey !== undefined) {
            setLocationKey(apiKey);
            localStorage.setItem('locationId', apiKey);
            await triggerMake();
        }

    }

    function handleChange(value: string) {
        setSelectedTask(value);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.locationId = locationKey || '';
        values.taskId = selectedTask;
        await triggerSend(values);
        alert('Sent');
    }

    return (
        <main className="items-center p-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} render={({field}) => (
                        <FormItem className="flex flex-row">
                            <FormLabel style={hidden}>Location API Key</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Profile API Key here" ref={inputRef} type="password"></Input>
                            </FormControl>
                            <FormControl>
                                <Button className="m-1" onClick={handleConnect}>Save</Button>
                            </FormControl>
                        </FormItem>
                    )} name="locationId"></FormField>
                    <FormField render={({field}) => (
                        <FormItem>
                            <FormLabel>Task</FormLabel>
                            <Select name="taskId" onValueChange={handleChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an item to send a message to."/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {tasks.map((task: { taskId: string; title: string; description: string; }) => (
                                        <SelectItem key={task.taskId}
                                                    value={task.taskId}><strong>{task.title}</strong>{task.description}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>

                    )} name="taskId">
                    </FormField>
                    <FormField
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        message={field.value}
                                        onChange={field.onChange}
                                    ></Tiptap>
                                </FormControl>
                            </FormItem>
                        )}
                        name="message"
                    ></FormField>
                    <Button className="my-1" type="submit">
                        Send
                    </Button>
                </form>
            </Form>
        </main>
    );
}
