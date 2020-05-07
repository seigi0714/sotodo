import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
    todos: []
})

export const getters = {
    orderdTodos: state => {
        return _.sortBy(state.todos, 'created')
    },
    doneTodos: (state, getters) => {
        return getters.orderdTodos.filter(todo => todo.done)
    },
    notDoneTodos: (state, getters) => {
        return getters.orderdTodos.filter(todo => !todo.done)
    }
}

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('todos',todosRef)
    }),
    add: firestoreAction((context, name) => {
        if(name.trim()){
            todosRef.add({
                name: name,
                done: false,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                doneat: null,
            })
        }
    }),
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
    toggle: firestoreAction((context, todo) => {
        todosRef.doc(todo.id).update({
            done: !todosRef.done,
            doneat: firebase.firestore.FieldValue.serverTimestamp()
        })
    })
}