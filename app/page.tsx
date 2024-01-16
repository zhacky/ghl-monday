"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Tiptap from "@/components/Tiptap";
import { usePathname } from "next/navigation";
import {
  ReactEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
// extract later
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const pathname = usePathname();
  const [segment, setSegment] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const segments = pathname.split("/");

  useEffect(() => {
    triggerMake();
  }, [])
  
  const triggerMake = async () => {
    const url = "https://hook.us1.make.com/yib6erf57tjxwmnv4wxpd2d34iqy6xli";
    const req = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url);
    if (res.ok) {
      const tasks = await res.json();
      setTasks(tasks);
    } else {
      console.log("An error occurred while fetching");
    }
  };

  const formSchema = z.object({
    taskId: z
      .string(),
    message: z
      .string()
      .min(1, "Message cannot be empty.")
      .max(255, "Message cannot be more than 255 characters.")
      .trim(),
  });handleChange
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    defaultValues: {
      taskId: "",
      message: "",
    },
  });

  function handleChange(value: string) {
    setSelectedTask(value);
  }

  
  function onSubmit(values: z.infer<typeof formSchema>) {
      values.taskId = selectedTask;
  }

  return (
    <main className="items-center p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <Select name="taskId" onValueChange={handleChange} required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item to send a message to." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tasks.map((task: { taskId: string; title: string; description: string; }) => (
                    <SelectItem key={task.taskId} value={task.taskId}><strong>{task.title}</strong>{task.description}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>

          )} name={""}>
          </FormField>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl hidden={tasks.length>0}>
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
