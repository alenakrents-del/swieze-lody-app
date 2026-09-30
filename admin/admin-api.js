export function createAdminApi(client){
  const rpc=async(name,args)=>{const{data,error}=await client.rpc(name,args);if(error)throw error;return data};
  return Object.freeze({
    client,
    session:()=>client.auth.getSession(),
    onAuth:(fn)=>client.auth.onAuthStateChange(fn),
    login:(email,password)=>client.auth.signInWithPassword({email,password}),
    logout:()=>client.auth.signOut(),
    recover:(email,redirectTo)=>client.auth.resetPasswordForEmail(email,{redirectTo}),
    updatePassword:(password)=>client.auth.updateUser({password}),
    isStaff:()=>rpc('is_staff'),
    orders:()=>rpc('staff_list_orders'),
    updateOrder:(id,status,minutes=null)=>rpc('staff_update_order',{p_order_id:id,p_status:status,p_estimated_minutes:minutes}),
    flavours:()=>rpc('staff_list_ice_cream_flavours'),
    setFlavourAvailable:(id,available)=>rpc('staff_set_ice_cream_available',{p_id:id,p_available:available}),
    saveFlavour:(value)=>rpc('staff_save_ice_cream_flavour',value),
    catalog:()=>rpc('staff_get_menu_catalog'),
    saveCategory:(value)=>rpc('staff_save_menu_category',value),
    saveProduct:(value)=>rpc('staff_save_menu_product',value),
    saveAnnouncement:(value)=>rpc('staff_save_in_app_announcement',value)
  });
}
