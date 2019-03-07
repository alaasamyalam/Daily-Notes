var filters={
    'all':function (todos) {
        return todos;
    },
    'active':function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    'completed':function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        })
    }
}
var todos_storage={
    fetch:function () {
        var todos=JSON.parse(localStorage.getItem('todos')||'[]');
        return todos;
    },
    save:function (todos) {
        localStorage.setItem('todos',JSON.stringify(todos));
    }
}
new Vue({
    'el':'.todoapp',
    data:{
        newItem:'',
        visibility:'all',
        ed: '<input class="editing" type="text">',
        todos:todos_storage.fetch(),
    },
    computed:{
         filterdtodos:function () {
             return filters[this.visibility](this.todos);
         },
        numberofitem:function () {
            return filters.active(this.todos).length;
        },
        text:function () {
            if(filters.active(this.todos).length>1)
                return 'Items';
            return 'Item';
        }
    },
    methods:{
        deleteTodo:function (todo) {
            this.todos.splice(this.todos.indexOf(todo),1);
        },
        addTodo:function () {
            if (this.newItem=='')
                return;
            this.todos.push({'title':this.newItem,'completed':false});
            this.newItem='';
        },
        removecombleted:function () {
            this.todos=filters.active(this.todos);
        }
    },
    watch:{
        todos:{
            handler:function (todos) {
                todos_storage.save(todos);
            },
            deep:true
        }
    }
})
