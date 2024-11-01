<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">
                    <strong>Task # {{todo ? todo.id : ''}}</strong>
                </h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="timer"></div>
                <h3>{{todo.title}}</h3>
                <div v-if="todo.overdue" class="danger"> <strong class="bold">Danger!</strong> This Task is OverDue </div>
                <div v-if="todo.status==5" class="info"> <strong class="bold">Info!</strong> This Task is Closed </div>
                <div v-if="todo.status==4" class="success"> <strong class="bold">Success!</strong> This Task is Solved </div>
                <p>{{todo.desc}}</p>
                <p>By <strong>{{todo.submitter ? todo.submitter.display_name : ''}}</strong> on <em>{{todo.date}}</em> Deadline <em>{{todo.until}}</em>, currently assigned to <em><strong>{{todo.asigned ? todo.asigned.display_name : ''}}</strong></em>
                </p>
                <div v-if="todo.comments && todo.comments.length">
                    <h6>Comments</h6>
                    <ol>
                        <li v-for="c in todo.comments">
                            <p class="mb-0">{{c.body}}</p>
                            <small>On {{c.date}} by {{c.submitter.display_name}}</small>
                        </li>
                    </ol>
                </div>
                <textarea class="form-control w-auto" placeholder="Add a Comment" v-model="comment.body"></textarea>
                <button type="button" class="btn btn-primary mt-2" @click.prevent="add_comment">
                    <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Add Comment </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['todo'],
    data() {
        return {
            spinner: {
                save: {
                    spinning: false
                }
            },
            ftime: '',
            comment: {
                body: ''
            },
            status: ['', 'New', 'Open', 'Buggy', 'Solved', 'Closed'],
            priority: ['', 'Low', 'Normal', 'High', 'Important'],
        }
    },
    created: function() {},
    watch: {
        todo: {
            immediate: true,
            deep: true,
            handler(val, oldVal) {
                this.regen(val.until)
            }
        },
    },
    methods: {
        add_comment() {
            this.spinner.save.spinning = true;
            this.$store.dispatch('todo/add_comment', {
                ...this.todo,
                ...this.comment,
            }).then(response => {
                console.log(response);
                this.todo.comments.push(response.data.todocomment);
                this.spinner.save.spinning = false;
                this.comment = '';
            }).catch(error => {});
        },
        regen(until) {
            if (until) {
                var myDate = until.split('-');
                var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
                var curDate = new Date().getTime();
                var newDate = newDate.getTime();
                var diff = newDate - curDate;
                if (0 < diff && (this.todo.status == '1' || this.todo.status == '2' || this.todo.status == '4')) {
                    jQuery(document).ready(function() {
                        var clock = jQuery('#timer').FlipClock(diff / 1000, {
                            clockFace: 'DailyCounter',
                            countdown: true
                        });
                    });
                } else {
                    jQuery('#timer').html('')
                }
            }
        }
    }
}
</script>