      import Config from 'react-native-config';
      import Get from './Get';
      import Post from './Post';
      import Put from './Put';
      import Delete from './Delete';

      // GET
      const customers = (data, token)=>Get('close/staff/seal/'+data,false, token)
      const sealShow= (data, token)=>Get('close/staff/seal/show/'+data,false, token)
      const customersSearch = (data, token)=>Get('close/staff/seal/'+data,false, token)
      const maps = (data, token) => Get('close/staff/map/'+data,false, token)
      const historyLock = (data, token) => Get('close/staff/seal/history/'+data,false, token)
      const sealHistoryShow= (data, token)=>Get('close/staff/seal/history/show/'+data,false, token)
      const logout= (token)=>Get('close/staff/logout',false, token)

      const ctmpay = (id, token) => Get('close/staff/ctm/pay/' + id, false, token)
      const ctmcustomer = (id, token) => Get('close/staff/ctm/customer/'+ id, false, token)

      const watermeter = (id,page,status, priority ,statussm, areas,search,orderType,order, from, to, token) => Get('close/staff/watermeter/'+ id+page+'&status='+status+'&priority='+priority+'&statussm='+statussm+'&areas='+areas+'&search='+search+'&orderType='+orderType+'&order='+order+'&from='+from+'&to='+to , false, token)

      const areas = (id, token) => Get('close/staff/watermeter/area/'+id, false, token)
      const showWm = (id, token) => Get('close/staff/watermeter/show/'+id, false, token)
      const HistoryShowWM = (id, token) => Get('close/staff/watermeter/showHistory/'+id, false, token)

      const addStaffIndex = (id, token) => Get('close/staff/watermeter/indexStaff/'+id, false, token)
      const addStaff = (id, token) => Get('close/staff/watermeter/addStaff/'+id, false, token)
      const actionWm = (id, token) => Get('close/staff/watermeter/indexActionWm/'+id, false, token)


      const approveWm = (id, token) => Get('close/staff/watermeter/approve/'+id, false, token)
      
      
      // const categories =(token) => Get('apiaaaa/close/admin/categories', false, token)
      // const categorieslist =(data, token) => Get('apiaaaa/close/admin/categories/list/'+ data, false, token)
      // const dapertements =(token) => Get('apiaaaa/close/admin/dapertements', false, token)
      // const dapertementslist =(data,token) => Get('apiaaaa/close/admin/dapertements/list/'+data, false, token)
      // const dapertementsuser =(data,token) => Get('apiaaaa/close/admin/dapertements?userid='+data, false, token)
      // const staffs =(token) => Get('apiaaaa/close/admin/staffs', false, token)      
      // const ticktes =(token) => Get('apiaaaa/close/admin/tickets', false, token)      
      // const actionStaffs =(data, token) => Get(`apiaaaa/close/admin/actionStaffs/${data}`, false, token)
      // const actionStaffLists =(data, token) => Get(`apiaaaa/close/admin/actionStaffLists/${data}`, false, token)
      // const defcustomer =(token) => Get('apiaaaa/close/admin/defcustomer', false, token)
      // const lockStaffList =(data, token) => Get(`apiaaaa/close/admin/lockStaffList/${data}`, false, token)
      // const lockStaffs =(data, token) => Get(`apiaaaa/close/admin/lockStaffs/${data}`, false, token)
      // const lockShow =(data, token) => Get(`apiaaaa/close/admin/lockshow/${data}`, false, token)
      // const typeShow =(data, token) => Get(`apiaaaa/close/admin/typeshow/${data}`, false, token)
      // const lockcreate =(data, token) => Get(`apiaaaa/close/admin/lockcreate/${data}`, false, token)     


      //POST
      const login = (data) => Post('open/staff/login', false, data);
      const scanCode = (data) =>Post('open/staff/code', false, data);
      const addStaffStore = (data, token) => Post('close/staff/watermeter/addStaffStore', false, data, token)
      const addStaffDelete = (data, token) => Post('close/staff/watermeter/destroy', false, data, token)

      const approveProses = (data, token) => Post('close/staff/watermeter/approveProses', false, data, token)
      // const staffslist =(data,token) => Post('apiaaaa/close/admin/staffs/list', false, data, token)
      // const subdapertementslist =(data,token) => Post('apiaaaa/close/admin/subdapertements/list', false, data, token)

      // const customerCreate = (data, token) => Post('apiaaaa/close/admin/customers', false, data, token);
      // const categoriesCreate = (data, token) => Post('apiaaaa/close/admin/categories', false, data, token);
      // const dapertementsCreate = (data, token) => Post('apiaaaa/close/admin/dapertements', false, data, token);
      // const subdapertementsCreate = (data, token) => Post('apiaaaa/close/admin/subdapertements', false, data, token);
      // const staffsCreate = (data, token) => Post('apiaaaa/close/admin/staffs', false, data, token);
      // const actionsCreate = (data, token) => Post('apiaaaa/close/admin/actions', false, data, token);
      // const actionsStaffStore = (data, token) => Post('apiaaaa/close/admin/actionStaffStore', false, data, token);
      // const customerList =(data, token) => Post(`apiaaaa/close/admin/customer/list`, false, data, token)
      // const ticketList =(data, token) => Post(`apiaaaa/close/admin/ticket/list`, false, data, token)
      // const actions =(data, token) => Post(`apiaaaa/close/admin/actionlists`, false, data, token)
      // const categorygroupList =(data, token) => Post(`apiaaaa/close/admin/category-groups/list`, false, data, token)
      // const categorytypeList =(data, token) => Post(`apiaaaa/close/admin/category-types/list`, false, data, token)
      // const lockList =(data, token) => Post(`apiaaaa/close/admin/lock/list`, false, data, token)
      // const lockStaffStore = (data, token) => Post('apiaaaa/close/admin/lockStaffStore', false, data, token);
      // const actionslock =(data, token) => Post(`apiaaaa/close/admin/actionlocklists`, false, data, token)
      // const lockactionsCreate = (data, token) => Post('apiaaaa/close/admin/lockactionscreate', false, data, token);
      // const segelList =(data, token) => Post(`apiaaaa/close/admin/segel/list`, false, data, token);
      // const lockStore = (data, token) => Post('apiaaaa/close/admin/segel/store', false, data, token);
      // const DaperdanSub =(data, token) => Post('apiaaaa/close/admin/SubDapertementlist', false, data, token)
      // const ticketsClose = (data, token) => Post(`apiaaaa/close/admin/ticket-close`, false, data, token);
      // PUT
      // const customerEdit = (data, token) => Put(`apiaaaa/close/admin/customers/${data.id}`, false, data, token);
      // const categoriesEdit = (data, token) => Put(`apiaaaa/close/admin/categories/${data.id}`, false, data, token);
      // const dapertementsEdit = (data, token) => Put(`apiaaaa/close/admin/dapertements/${data.id}`, false, data, token);
      // const subdapertementsEdit = (data, token) => Put(`apiaaaa/close/admin/subdapertements/${data.id}`, false, data, token);
      // const staffsEdit = (data, token) => Put(`apiaaaa/close/admin/staffs/${data.id}`, false, data, token);
      // const ticketsEdit = (data, token) => Put(`apiaaaa/close/admin/tickets/${data.id}`, false, data, token);      
      // const actionsEdit = (data, token) => Put(`apiaaaa/close/admin/actions/${data.id}`, false, data, token);
      // const actionStaffUpdate = (data, token) => Put(`apiaaaa/close/admin/actionStaffUpdate`, false, data, token);

      // DELETE
      const deleteLock = (id, token) => Delete(`close/staff/seal/delete/${id}`, false, token);
      // const categoriesDelete = (id, token) => Delete(`apiaaaa/close/admin/categories/${id}`, false, token);
      // const dapertementsDelete = (id, token) => Delete(`apiaaaa/close/admin/dapertements/${id}`, false, token);
      // const subdapertementsDelete = (id, token) => Delete(`apiaaaa/close/admin/subdapertements/${id}`, false, token);
      // const staffsDelete = (id, token) => Delete(`apiaaaa/close/admin/staffs/${id}`, false, token);
      // const ticketsDelete = (id, token) => Delete(`apiaaaa/close/admin/tickets/${id}`, false, token);
      // const actionsDelete = (id, token) => Delete(`apiaaaa/close/admin/actions/${id}`, false, token);
      // const actionStaffDestroy = (data, token) => Delete(`apiaaaa/close/admin/actionStaffDestroy/${data.action_id}/${data.staff_id}`, false, token);
      // const lockDestroy = (id, token) => Delete(`apiaaaa/close/admin/lockdestroy/${id}`, false, token);
      // const lockStaffDestroy = (data, token) => Delete(`apiaaaa/close/admin/lockStaffDestroy/${data.lockaction_id}/${data.staff_id}`, false, token);
      // const lockactionsDelete = (id, token) => Delete(`apiaaaa/close/admin/lockactionsdestroy/${id}`, false, token);
      const API = {
            login,
            ctmpay,
            ctmcustomer,
            scanCode,
            logout,
            deleteLock,
            customers,
            customersSearch,
            sealHistoryShow,
            historyLock,
            maps,
            sealShow,
            watermeter,
            areas,
            showWm,
            HistoryShowWM,
            addStaff,
            addStaffStore,
            addStaffIndex,
            addStaffDelete,
            actionWm,
            approveWm,
            approveProses
      }

      export default API;