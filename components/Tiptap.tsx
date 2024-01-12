'use client'
import {useEditor, EditorContent} from '@tiptap/react';
import {StarterKit} from "@tiptap/starter-kit";
import Toolbar from "@/components/Toolbar";
import Heading from "@tiptap/extension-heading";

export default function Tiptap({message, onChange}: {
    message: string;
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({}), Heading.configure({
            HTMLAttributes: {
                class: 'text-xl font-bold',
                levels: [2],
            }
        })],
        content: message,
        editorProps: {
            attributes: {
                class:
                    'rounded-md border min-h-[150px] border-input bg-back'
            },
        },
        onUpdate: ({editor})=>{
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        }
    });


    return (
        <div className="flex flex-col justify-stretch min-h-[150px] ">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}