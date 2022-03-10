const requests={
    GetAllBetterExpert:'/BetterExpert',
    GetExpertsByExpertiseId:'/ExpertsByExpertiseId',
    GetAllExpertiseByCategoryId:'/ExpertiseByParentId',
    GetExpertById:'/Expert',
    GetFreeAppointmentDateByExpertId:'/FreeAppointmentDate',
    GetAppointmentTimeByExpertID:'/AppointmentTime',
    GetAppointmentTypeByExpertID:'/AppointmentType',
    GetAppointmentByCustomerId:'/AppointmentByCustomerId',
    Search:'/Search',
    SearchCity:'/SearchCity',
    GetCountyByProvinceId:'/CountyByProvinceId',
    RegisterOTP:'/Account/RegisterOTP',
    Register:'/Account/Register',
    Authenticate:'Account/Authenticate',
    UpdatePassword:'/Account/UpdatePassword',
    UpdateUserInformation:'/User/UpdateUserInformation',
    SetAppointment:'/SetAppointment',
    
}

export default requests;