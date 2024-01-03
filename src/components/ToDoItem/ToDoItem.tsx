import {Input} from "antd";
import {useToDoStore} from "@/modules/CurrentTasks/store/useToDoStore.ts";
import ActionButton from "@/UI/ActionButton/ActionButton.tsx";
import type {TToDoItem} from "@/modules/CurrentTasks/store/useToDoStore.ts";
import type {SyntheticEvent} from "react";
import './ToDoItem.scss'

function ToDoItem({_id, text, editMode, confirmDeletion}: TToDoItem) {

    const {
        setInputItemText,
        setEditTodoMode,
        disableAndUpdateTodo,
        completeTodo,
        deleteTodoById
    } = useToDoStore()

    const setItemText = (e: SyntheticEvent<HTMLInputElement>, _id: number) => {
        setInputItemText((e.target as HTMLInputElement).value, _id)
    }

    const getActionHandler = (editMode: boolean) => {
        switch (editMode) {
            case true: return () => disableAndUpdateTodo(_id, text)
            case false: return () => setEditTodoMode(_id)
        }
    }
    const getActionType = (editMode: boolean) => {
        switch (editMode) {
            case true: return 'check'
            case false: return 'edit'
        }
    }
    const deleteToDoItem = () => deleteTodoById(_id)

    return (
        <div key={_id} className='to-do-item'>
                <Input
                    onChange={(e) => setItemText(e, _id)}
                    value={text}
                    disabled={!editMode}
                />
                <div className='task-actions'>
                    <ActionButton actionHandler={() => completeTodo(_id)} type='complete'/>
                    <ActionButton actionHandler={getActionHandler(editMode)} type={getActionType(editMode)}/>
                    <ActionButton actionHandler={confirmDeletion} type='delete'/>
                </div>
        </div>
    )
}

export default ToDoItem
