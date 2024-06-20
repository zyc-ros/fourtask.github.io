import { ScrollArea } from "@/components/ui/scroll-area";
import { TrashProps } from "./Interface";
import TodoOverview from "./TodoOverView";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { unstable_batchedUpdates } from "react-dom";

export default function Trash({ TodoList, lang, removeTodo, updateStorage }: TrashProps) {
  const [checkedList, setCheckedList] = useState<number[]>([])
  const [selectedAll, setSelectedAll] = useState<boolean>(true)

  const addToList = (index: number) => {
    if (checkedList.includes(index)) {
      const temp = [...checkedList]
      temp.splice(temp.indexOf(index), 1)
      setCheckedList(temp)
    } else {
      const temp = [...checkedList, index]
      setCheckedList(temp)
    }
  }
  const delChecked = () => {
    removeTodo(checkedList)
    setCheckedList([])
  };

  const restore = () => {
    checkedList.map((index) => {
      const newTodoList = [...TodoList];
      const todo = newTodoList.find((item) => item.index === index);
      if (todo) {
        todo.trash = false;
      }
      updateStorage(newTodoList);
    })
    setCheckedList([])
  }

  const checkall = (type: boolean) => {
    if (type) {
      const trashTodoIndices = TodoList
        .filter((todo) => todo.trash)
        .map((trashTodo) => trashTodo.index);
      setCheckedList(trashTodoIndices)
    }
    else {
      setCheckedList([]);
    }
    setSelectedAll(!selectedAll);
  }

  useEffect(() => {
    const areArraysEqual = (arr1: number[], arr2: number[]) => {
      const sortedArr1 = arr1.slice().sort();
      const sortedArr2 = arr2.slice().sort();
      return sortedArr1.every((item, index) => item === sortedArr2[index]);
    };
    const trashTodoIndices = TodoList
      .filter((todo) => todo.trash)
      .map((trashTodo) => trashTodo.index);
    if (areArraysEqual(trashTodoIndices, checkedList)) {
      setSelectedAll(false);
    }
    else {
      setSelectedAll(true);
    }
  }, [checkedList, TodoList])
  return (
    <>
      <div className="w-[35vw] mr-2 ml-2 mb-2">
        <div className="flex space-x-2 w-full items-baseline">
          <Button variant="outline" onClick={() => checkall(selectedAll)}>{selectedAll ? lang["trash_button_select1"] : lang["trash_button_select2"]}</Button>
          <Button variant="outline" onClick={restore} disabled={checkedList.length === 0}>{lang["trash_button_restore"]}</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={checkedList.length === 0}>{lang["trash_button_delete"]}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                {lang["trash_delete_dialog_title"]}
              </DialogHeader>
              <DialogDescription>
                {lang["trash_delete_dialog_des"]}
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>{lang["trash_delete_dialog_cancelbutton"]}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      delChecked()
                    }}
                  >
                    {lang["trash_delete_dialog_delbutton"]}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[35vh] mt-2">
          {TodoList.map((todo, index) => {
            if (todo.trash) {
              return (
                <div className="flex items-center mb-2 w-[33vw]" key={index}>
                  <Checkbox checked={checkedList.includes(todo.index)} onCheckedChange={() => addToList(todo.index)} />
                  <div className="w-full" onClick={() => addToList(todo.index)}><TodoOverview item={todo} lang={lang} /></div>
                </div>
              )
            }
          })}
        </ScrollArea>
      </div>
    </>
  )
}