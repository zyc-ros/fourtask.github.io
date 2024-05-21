'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster, toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CalendarIcon, Half1Icon, LapTimerIcon, Link2Icon, TokensIcon, TrashIcon, UpdateIcon } from '@radix-ui/react-icons';
import MultipleSelector, { Option } from '@/components/ui/MultipleSelector';
import { DateTimePicker, DateTimePickerRef } from '@/components/ui/DatetimePicker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SubTodoItem, TodoProps } from './interface';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';


function Todo({ todo, completedTODO, removeTODO, reviseTodo, addTag, tagOptions, reLevel, setDeadline, droppedLevel, addSub, completedSubTODO, delSubTodo, reviseSubTodo }: TodoProps) {
  const datetimePicker = useRef<DateTimePickerRef>(null)
  const [value, setValue] = useState<string>("")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    let lastindex = 0;
    if (todo.sub.length === 0) {
      lastindex = 1
    } else {
      lastindex = todo.sub[todo.sub.length - 1].index + 1
    }
    const newSubTodoItem: SubTodoItem = { index: lastindex, text: value, completed: false }
    addSub(todo.index, newSubTodoItem)
    setValue("");
  }

  return (
    <div className="shadow-md rounded bg-white mb-2 ml-1 mr-1 dark:bg-zinc-950 border"
      style={{ opacity: todo.completed ? '0.2' : "1" }}
    >
      <div className="w-full h-[1vh] rounded-t" style={{ backgroundColor: todo.completed ? '#39834A' : "#FF3333" }}
        draggable
        onDragOver={(e) => { e.preventDefault() }}
        onDragEnd={(e) => {
          e.preventDefault();
          reLevel(todo.index, droppedLevel)
        }} >
      </div>
      <div className="flex items-center ml-3 mr-3 mt-2 mb-2 space-x-2">
        <Checkbox checked={todo.completed} onCheckedChange={() => completedTODO(todo.index)} />
        <Textarea rows={3} cols={50}
          className="break-words border-none resize-none h-[3rem] shadow-none no-scrollbar"
          readOnly={todo.completed} value={todo.text}
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
          onChange={(e) =>
            reviseTodo(todo.index, e.target.value)
          } />
      </div>
      <div className="ml-3 mr-3">
        <form>
          <MultipleSelector
            className="break-normal"
            options={tagOptions}
            value={todo.tags.map((item) => {
              return {
                label: item,
                value: item
              };
            })}
            creatable
            onChange={(e) => addTag(todo.index, e.map((item) => item.value))}
            placeholder="Select tags..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            } />
        </form>
      </div>
      <Separator className="opacity-40" />

      <div className="flex items-center justify-between ml-3 mr-3 mt-2 mb-2 pb-2" style={{ pointerEvents: todo.completed ? "none" : "auto" }} >


        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={{
                pathname: "/zen",
                query: { index: todo.index }
              }}
              >
                <LapTimerIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zen Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>



        <Dialog>
          <DialogTrigger>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CalendarIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{todo.deadline === "" ? "Deadline" : todo.deadline}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Todo&apos;s Deadline</DialogTitle>
              <DialogDescription>Set a deadline and AxisGTD will notify you when the specified time is reached.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-5">
              <DateTimePicker granularity="second" ref={datetimePicker} jsDate={todo.deadline === "" ? null : new Date(JSON.parse(todo.deadline))} />
              <DialogClose>
                <Button variant="outline" onClick={() => {
                  if (datetimePicker.current?.jsDate) {
                    if ((datetimePicker.current?.jsDate?.getTime() as number) - (new Date().getTime()) >= 0) {
                      setDeadline(todo.index, JSON.stringify(datetimePicker.current?.jsDate?.toLocaleString()));
                    }
                    else {
                      toast("The time is illegal", { description: "Must be set after the current date!" })
                    }
                  } else {
                    setDeadline(todo.index, "")
                  }
                }}>
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TokensIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{todo.sub.length === 0 ? "SubTodo" : todo.sub.length + " Sub Todos"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sub-Todo</DialogTitle>
              <DialogDescription>Create and view your subtasks here.</DialogDescription>
              <div className="flex flex-col">
                <div><form onSubmit={handleSubmit} className="flex space-x-3 justify-start mb-2 ml-5 mr-5 mt-3"><Input placeholder='Add sub-Todo here...' value={value} onChange={(e) => { setValue(e.target.value) }} /><Button variant="outline">Add</Button></form></div>
                <ScrollArea className="h-[36vh]">
                  {
                    todo.sub.map((item) => {
                      return (
                        <div className="flex space-x-3 items-center mb-2 mr-5 ml-5 mt-2">
                          <Checkbox checked={item.completed} onCheckedChange={() => completedSubTODO(todo.index, item.index, item)} />
                          <Input value={item.text}
                            className="border-none shadow-none overflow-x-auto"
                            style={{ textDecoration: item.completed ? "line-through" : "" }}
                            disabled={item.completed}
                            onChange={(e) => reviseSubTodo(todo.index, item.index, item, e.target.value)} />
                          <TrashIcon onClick={() => { delSubTodo(todo.index, item.index) }} />
                        </div>
                      )
                    })
                  }
                </ScrollArea>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TrashIcon onClick={() => removeTODO(todo.index)} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  );
}

export default Todo