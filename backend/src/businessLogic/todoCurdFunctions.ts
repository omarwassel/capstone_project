
import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate'

import { TodoAccess } from '../dataLayer/todoAccess'
// import { TodoS3Access } from '../dataLayer/todoS3Access'

import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'


const todoAccess = new TodoAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodosFromDynamodb(userId)
}

export async function getAllTodosByTag(tag:String,userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodosByTagFromDynamodb(tag,userId)
}

export async function createTodo(CreateTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {

  const itemId = uuid.v4()
  return await todoAccess.createTodoToDynamodb({
    userId: userId,
    todoId: itemId,
    createdAt: new Date().toISOString(),
    name: CreateTodoRequest.name,
    dueDate: CreateTodoRequest.dueDate,
    done: false,
    tag:CreateTodoRequest.tag
  
  })
}

export async function updateAttachmentUrl(userId:String,todoId: string) {
  return await todoAccess.updateAttachmentUrl(userId,todoId)
}

export async function updateTodo(CreateTodoRequest: UpdateTodoRequest,userId:String, todoId: string) {
  return await todoAccess.updateTodoInDynamodb(userId,todoId,CreateTodoRequest)
}

export async function deleteTodo( userId:String,todoId: string) {
  return await todoAccess.deleteTodoFromDynamodb(userId,todoId)
    
}

