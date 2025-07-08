import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';

export default function RTE({label, name, control, defaultValue=''}){
    return (
        <div className="w-full">
            {label && <label className="text-white inline-block mb-2 pl-2">{label}</label>}
            <Controller 
                name={name || "content"}
                control={control}
                render={({field:{value, onChange}}) => (
                    <Editor
                        value={value || ""}
                        apiKey
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins:[
                                "image",
                                "advlist",
                                "autolink",
                                "autosave",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                             toolbar:
                            "undo redo | restoredraft | blocks | paste | image | insertdatetime | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
                            content_style: `
                                body { font-family: Arial, sans-serif; font-size: 14px; }

                                h1 { font-size: 32px; font-weight: bold; margin: 20px 0; }
                                h2 { font-size: 28px; font-weight: bold; margin: 18px 0; }
                                h3 { font-size: 24px; font-weight: bold; margin: 16px 0; }
                                h4 { font-size: 20px; font-weight: bold; margin: 14px 0; }
                                h5 { font-size: 16px; font-weight: bold; margin: 12px 0; }
                                h6 { font-size: 14px; font-weight: bold; margin: 10px 0; }

                                p  { font-size: 14px; margin: 10px 0; }
                            `,
                            browser_spellcheck: true,
                            smart_paste: false,
                            paste_merge_formats: true,
                        }}
                        onEditorChange={(newValue) => {
                            onChange(newValue);
                        }}
                    />
                )}
            />
        </div>
    )
}
