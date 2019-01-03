import requester from "../helpers/requester";
import observer from "../helpers/observer";

const create = (context, path) => {
    requester.post(context.state, '/'+path)
        .then(res => res.json())
        .then(res => {
            observer.fire('notifications', {
                type: res.type,
                message: res.message
            });
            if(res.type === 'info'){
                context.setState({redirect: true})
            }
        })
};
const edit = (context, path) => {
    requester.update(context.state, '/' + path +'/' + context.props.match.params.id)
        .then(res => res.json())
        .then(res => {
            observer.fire('notifications', {
                type: res.type,
                message: res.message
            });
            if(res.type === 'info'){
                context.setState({redirect: true})
            }
        })
};
const onMount = (context, path) => {
    let names = Object.keys(context.state);

    requester.get('/' + path + '/' + context.props.match.params.id)
        .then(res => res.json())
        .then(res => {
                let item = res.data;
                let temp = {};
                if(item) {
                    names.forEach(name => {
                        if (item[name]) temp[name] = item[name];
                    });
                    context.setState(temp);
                }
            }
        )
};
export default {
    create,
    edit,
    onMount
}