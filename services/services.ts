export function nest(data: any) {
    let comment_id_childs_map:any = {}
    let comment_id_data_map:any = {}
    let final_res = []
    for(let i=0; i< data.length; i++) {
        if(data[i].parent_id) {
            const parent_id = data[i].parent_id
            if(comment_id_childs_map[`${parent_id}`]) comment_id_childs_map[`${parent_id}`].push(data[i].id)
            else comment_id_childs_map[`${parent_id}`] = [data[i].id]
        } else {
            final_res.push({id: data[i].id})
        }
        comment_id_data_map[`${data[i].id}`] = data[i]
    }

    final_res = final_res.map((el) => {
        return sendNest(comment_id_childs_map, comment_id_data_map, el.id)
    })
    return final_res
}

function sendNest(comment_id_childs_map:any, comment_id_data_map:any, id:string) {
    const temp_res = comment_id_data_map[id]
    let childrens = comment_id_childs_map[id]
    let res_child = []
    for(let i=0; childrens && i<childrens.length; i++) {
        const child = sendNest(comment_id_childs_map, comment_id_data_map, childrens[i])
        res_child.push(child)
    }
    temp_res.childrens = res_child
    return temp_res
}
