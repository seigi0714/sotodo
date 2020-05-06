import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
    todos: []
})

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('todos',todosRef)
    }),
    add: firestoreAction((context, name) => {
        if(name.trim()){
            todosRef.add({
                name: name,
                done: false,
                create: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }),
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
    toggle: firestoreAction((context, todo) => {
        todosRef.doc(todo.id).update({
            done: !todosRef.done
        })
    })
}