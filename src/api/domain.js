import http from 'app-plugin/api/http'

export default {
    getList() {
        return http({
            url: '/esmanageapi/domain-perms/manager/',
            method: 'get',
        })
    },
    create(data) {
        return http({
            url: '/esmanageapi/domain-perms/manager/',
            method: 'post',
            data,
        }) 
    },
    getItemById(id) {
        return http({
            url: `/esmanageapi/domain-perms/manager/${id}/`,
            method: 'get',
        })
    },
    update(id, data) {
        return http({
            url: `/esmanageapi/domain-perms/manager/${id}/`,
            method: 'put',
            data,
        })
    },
    updatePartOf(id, data) {
        return http({
            url: `/esmanageapi/domain-perms/manager/${id}/`,
            method: 'patch',
            data,
        })
    },
    delete(id) {
        return http({
            url: `/esmanageapi/domain-perms/manager/${id}/`,
            method: 'delete',
        })
    },
}