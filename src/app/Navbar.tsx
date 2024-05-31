'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { useEffect, useLayoutEffect, useState } from 'react';
import { BellIcon, Crosshair1Icon, EnvelopeClosedIcon, FileTextIcon, GitHubLogoIcon, HamburgerMenuIcon, HeartIcon, MoonIcon, PlusCircledIcon, SunIcon, TokensIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { NavProps, TODOFormProps, TodoItem, TodoOverviewProps } from './Interface';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PrivacyPolicy from './Text';
import localForage from "localforage"
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';



function TODOForm({ addTodo, TodoList }: TODOFormProps) {
  const [value, setValue] = useState<string>("");
  const [level, setLevel] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let lastindex = 0;
    e.preventDefault();
    if (!value) return;
    if (level === 0) {
      toast("No Todo type", {
        description: "You must select a todo type",
      })
      return
    };
    if (TodoList.length === 0) {
      lastindex = 1;
    }
    else {
      lastindex = TodoList[TodoList.length - 1].index + 1;
    }
    addTodo(lastindex, value, level);
    setValue("");
  }


  useEffect(() => {
    localForage.config({
      driver: localForage.INDEXEDDB,
      storeName: "AxisGTD",
      version: 1,
      description: "database for AisGTD"
    })
  })


  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <div className="flex space-y-2 justify-between flex-col items-baseline ">
        <Label htmlFor="entry_todo" className="break-normal w-[14vh]">Todo Content: </Label>
        <Input id='entry_todo' className="w-[30vh]" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='Add a Todo here...' />
      </div>
      <div className="flex space-y-2 justify-between flex-col items-baseline ">
        <Label htmlFor="todo_select" className="break-normal w-[14vh]">Todo Type: </Label>
        <div id='todo_select' className="w-10/12">
          <Select onValueChange={(e) => setLevel(Number(e))}>
            <SelectTrigger className="space-x-2 w-[30vh]">
              <Crosshair1Icon />
              <SelectValue placeholder="Please select Todo type" ></SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectGroup>
                <SelectItem value='1'>Important and Urgent</SelectItem>
                <SelectItem value='2'>Important but Not Urgent</SelectItem>
                <SelectItem value='3'>Urgent but Not Important</SelectItem>
                <SelectItem value='4'>Not Urgent and Not Important</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DrawerClose className="flex  items-center justify-center" asChild>
        <Button type="submit" variant="outline">Add</Button>
      </DrawerClose>
    </form>
  );
}

function TodoOverview({ item }: TodoOverviewProps) {
  return (
    <div className="flex space-y-2 flex-col items-baseline p-2 mt-2 mb-3 shadow ml-2 mr-2 dark:border">
      <div className="flex items-center ml-2">
        <p>{item.index + "."}</p>
        <p className="w-96 text-nowrap truncate">{item.text}</p>
      </div>
      <div className="flex items-center justify-between space-x-2 ml-2 pr-4 w-full">
        <Checkbox checked={item.completed} />
        <div className="flex items-center space-x-1"><BellIcon /> <p>{item.deadline === "" ? "No Deadline" : item.deadline}</p></div>
        <div className="flex items-center space-x-1"><TokensIcon /><p>{item.sub.length} Sub-Todo(s)</p></div>
      </div>
    </div>

  )
}

function Navbar({ addTodo, TodoList, setTODOList, setSearchText, setLayoutType, layoutType, setDisplayCompleted, displayCompleted }: NavProps) {

  const { setTheme } = useTheme()
  const [fileContent, setFileContent] = useState<string>('')
  const [dataType, setDataType] = useState<string>("import")
  const [dataImportInfo, setDataImportInfo] = useState<string>("")
  const [secTodoList, setSecTodoList] = useState<TodoItem[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setFileContent(e.target?.result as string)
        } else {
          console.error('Failed to read file content.');
        }
      }
      reader.readAsText(file)

    }
  }

  const handleFileupload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      setSecTodoList(JSON.parse(fileContent) as TodoItem[])
      if (TodoList !== secTodoList) {
        setDataImportInfo("The original data conflicts with the imported data. Please select the corresponding data to overwrite it.")
      }
    }
    catch {
      toast("No Upload File", { description: "Please upload data file." })
    }
  }

  const ImportData = () => {
    const UpdateStorge = (dataList: TodoItem[]) => {
      setTODOList(dataList);
      localForage.setItem("TODOList", dataList)
    }

    if (dataType === "original") {
      UpdateStorge(TodoList)
    }
    else {
      UpdateStorge(secTodoList)
    }
    setSecTodoList([])

  }

  useLayoutEffect(() => {
    const layoutStorage = localStorage.getItem("layout")
    if (layoutStorage) {
      setLayoutType(layoutStorage)
    }
    else {
      setLayoutType("axis")
    }

  }, [])


  return (
    <div className="w-screen h-[6vh] shadow flex items-center justify-between bg-white dark:bg-zinc-950 dark:border-b">
      <div className="w-1/12 ml-5">
        <Image src="/logo.svg" alt="Logo" width={156.317} height={24.1167} />
      </div>
      <div className="flex items-center space-x-2 mr-5">

        <Input id="search_input" placeholder="Search Todo or tag ..." onChange={(e) => { setSearchText(e.target.value) }} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-none shadow-none">
              <SunIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setTheme("light") }}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setTheme("dark") }}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setTheme("system") }}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="border-none shadow-none">
              <PlusCircledIcon className="w-[1rem] h-[1rem]" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex items-center flex-col pt-3 pb-10 space-y-3">
            <DrawerHeader>
              <DrawerTitle>
                Add New Todo
              </DrawerTitle>
            </DrawerHeader>
            <TODOForm addTodo={addTodo} TodoList={TodoList}></TODOForm>
          </DrawerContent>
        </Drawer>

        <Sheet>
          <SheetTrigger asChild>

            <Button variant="outline" className="border-none shadow-none">
              <HamburgerMenuIcon className="w-[1rem] h-[1rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-2xl">Setting</SheetHeader>
            <SheetDescription>You can make some settings for AxisGTD here</SheetDescription>
            <ScrollArea className="h-[90vh] overflow-y-hidden">
              <div className="mt-5 space-y-5 flex flex-col items-baseline ml-4 mr-4">

                <div>
                  <p className="text-l font-semibold" >Set layout</p>
                  <p className="text-xs font-thin mb-2">Set the layout of the interface</p>
                  <Select defaultValue="axis"
                    value={layoutType}
                    onValueChange={(e) => { setLayoutType(e); localStorage.setItem("layout", e) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set layout"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="axis">Axis Default (2*2) </SelectItem>
                      <SelectItem value="kanban">Kanban Mode (4*1) </SelectItem>
                      <SelectItem value="board">Big Board (1*4) </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-l font-semibold">Enable System Notifications</p>
                  <p className="text-xs font-thin mb-2">Make sure you have turned on notification permissions</p>
                  <Button variant="outline" onClick={
                    () => {
                      Notification.requestPermission().then((result) => {
                        if (result === "granted") {
                          toast("Permissions are already available", {
                            description: "AxisGTD has been granted system notification permissions"
                          })

                        }
                        else if (result === "denied") {
                          toast("The request was denied", {
                            description: "Please check your browser settings for AxisGTD to get notification permissions"
                          })
                        }
                      })
                    }}>Enable</Button>
                </div>

                <div>
                  <p className="text-l font-semibold">Display Completed Todo</p>
                  <p className="text-xs font-thin mb-2">If you want to focus only on completed todos, you can turn this switch on</p>

                  <Switch checked={displayCompleted}
                    onCheckedChange={
                      (e) => {
                        setDisplayCompleted(e);
                        localStorage.setItem("displayCompleted", (!displayCompleted).toString())
                      }} />
                </div>


                <div>
                  <p className="text-l font-semibold">Data Export</p>
                  <p className="text-xs font-thin mb-2">You can export data to other browsers or devices for use</p>

                  <Button variant="outline" onClick={() => {
                    const date = Date.now().toString()
                    const blob = new Blob([JSON.stringify(TodoList)], { "type": "application/json" })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url;
                    link.download = "AxisGTD-" + date + ".json"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}>Download</Button>
                </div>

                <div>
                  <p className="text-l font-semibold">Data Import</p>
                  <p className="text-xs font-thin mb-2">Import previously exported data</p>
                  <div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="outline" onClick={() => { setDataType("original"); setSecTodoList([]) }}>Import</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Import Data</DialogHeader>
                          <DialogDescription>There may be data inconsistencies, please choose which data to use.</DialogDescription>
                          <div className="flex flex-col">
                            <form onSubmit={handleFileupload} className="flex space-x-2">
                              <Input type="file" accept='.json' onChange={handleFileChange} />
                              <Button variant="outline" type="submit" onClick={() => { handleFileupload }}>Upload</Button>
                            </form>
                            <Tabs onValueChange={(e) => setDataType(e)} defaultValue="original" className="w-full pt-2">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="original">Original Data</TabsTrigger>
                                <TabsTrigger value="import">Import Data</TabsTrigger>
                              </TabsList>

                              <p className="font-light text-sm">{dataImportInfo}</p>
                              <TabsContent value="original">
                                <ScrollArea className="h-[30vh]">
                                  {
                                    TodoList.map((item: TodoItem, index) => {
                                      return (<div key={index}><TodoOverview item={item} /></div>)
                                    })
                                  }
                                </ScrollArea>
                              </TabsContent>
                              <TabsContent value="import">

                                <ScrollArea className="h-[30vh]">
                                  {
                                    secTodoList.map((item: TodoItem, index) => {
                                      return (<div key={index}><TodoOverview item={item} /></div>)
                                    })
                                  }
                                </ScrollArea>
                              </TabsContent>
                            </Tabs>
                          </div>
                          <DialogClose asChild>
                            <Button variant="outline" onClick={() => { ImportData() }}>Confirm</Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-l font-semibold">Data Clear</p>
                  <p className="text-xs font-thin mb-2">It is important to note that this operation is not reversible</p>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="outline">Clear Data</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Are you sure you want to clear the data?</DialogHeader>
                      <DialogDescription>The data is very important and cannot be recovered once it is cleaned. It is recommended that you back up the data in the settings before cleaning.</DialogDescription>
                      <DialogFooter>
                        <DialogClose>
                          <Button>Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                          <Button variant="outline" onClick={() => {
                            setTODOList([])
                            localForage.setItem("TODOList", [])
                            toast("Cleaned up", { description: "AxisGTD has cleared all data !" })
                          }}>Clear</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div>
                  <p className="text-l font-semibold mb-2">About</p>
                  <p className="break-words font-light text-sm">
                    A minimalistic and serene personal office TodoList software that empowers you to prioritize todos effectively, with AxisGTD serving as a helpful aid. However, don&apos;t become overlydependent on AxisGTD.
                    It should be viewed as a mere component of your efficient office setup. Simply capture your todos within the app, set AxisGTD aside, and return to it later to mark off completed items once your work is finished.
                  </p>
                  <br />
                  <p><b>It is important to note: </b><br />AxisGTD stores all data in the local browser indexedDB, so please back up your data before clearing the browser data for this website!</p>
                </div>
              </div>

              <div className="flex space-x-5 justify-between pl-2 pr-2 mb-2 mt-2">
                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HeartIcon className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Donate Me
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Donate Me
                      </DialogTitle>
                      <DialogDescription>
                        If you like this project, you can properly donate the right amount to me according to your financial situation, which will motivate AxisGTD to become better!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-5">
                      <Image
                        src="/Donate_Paypal.png"
                        alt="Donate_Paypal"
                        width={200}
                        height={200} />

                      <Image
                        src="/Donate_Wechat.png"
                        alt="Donate_Wechat"
                        width={200}
                        height={200} />

                    </div>
                    <DialogClose>
                      <Button variant="outline">Ok</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <FileTextIcon className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Privacy Policy
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                      <DialogDescription>Set a deadline and AxisGTD will notify you when the specified time is reached.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-start justify-center space-y-5">
                      <ScrollArea className="h-[30vh] p-2">
                        <PrivacyPolicy />
                      </ScrollArea>
                    </div>
                    <DialogClose>
                      <Button variant="outline">Ok</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>


                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <EnvelopeClosedIcon />
                        </TooltipTrigger>
                        <TooltipContent>
                          Contact Me
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Me</DialogTitle>
                      <DialogDescription>Set a deadline and AxisGTD will notify you when the specified time is reached.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-start justify-center space-y-5">
                      <Link href="mailto:magician33333@gmail.com" className="flex space-x-3 items-center">
                        <EnvelopeClosedIcon className="size-5" />
                        <Label>Email : magician333333@gmail.com</Label>
                      </Link>
                      <Link href="https://github.com/magician333/AxisGTD" target="_blank" className="flex space-x-3 items-center">
                        <GitHubLogoIcon className="size-5" />
                        <Label>Github : https://github.com/magician333/AxisGTD</Label>
                      </Link>
                    </div>
                    <DialogClose>
                      <Button variant="outline">Ok</Button>
                    </DialogClose>

                  </DialogContent>
                </Dialog>

              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
