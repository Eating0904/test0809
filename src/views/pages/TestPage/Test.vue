<template lang="pug">
#test
    .btn
        el-button(
            type="success"
            plain 
            @click="handleAction({ action: 'create' })"
        ) + 新增
    .tableBlock
        TableWrapper(
            :tableData="tableData"
            :tableHeight="500"
            :columnSetting="columnSetting"
        )
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { TableWrapper } from 'app-plugin/components'
import { useStore } from 'vuex'
import { setFunctionColumn } from 'app-plugin/utils/hooks/useTable'

import domainApi from '@api/domain'

export default {
    name: 'TestPage',
    components: {
        TableWrapper,

    },
    setup() {
        const tableData = ref([])
        const columnSetting = [
            {
                prop: 'domain_name',
                label: '名稱',
            },
            {
                prop: 'description',
                label: '描述',
            }
        ]

        const store = useStore()

        const getTableData = async () => {
            tableData.value = await domainApi.getList()
        }

        const handleAction = async ({ action, row = null }) => {
            const id = row ? row.id : null
            const headerTitle = (action != 'delete') ? '新增' : '刪除'
            
            if (action !== 'delete'){

                const settings = {
                    component: 'TestForm',
                    headerTitle,
                    contentSize: {
                        width: '50%',
                        height: '70%',
                    },
                }

                const props={
                    action,
                }

                if (id !== null) {
                    settings.id = id
                    props.id = id
                } else {
                    settings.id = 'only'
                }

                const events={
                    'refresh-page': () => {
                        getTableData()
                    }
                }

                store.dispatch('panels/addPanel', { settings, props, events })
            } else {
                await domainApi.delete(id)
                getTableData()
            }
        }

        setFunctionColumn({
            columnSetting,
            handleAction,
            actions: ['edit', 'delete'],
        })

        // 在 html 渲染之前要先載完資料
        onBeforeMount(() => {
            getTableData()
        })

        return { handleAction, tableData, columnSetting }
    },
}
</script>

<style lang="sass" scoped>
#test
    padding: 0 15px
    .btn
        margin: 10px
        +flex-right
</style>