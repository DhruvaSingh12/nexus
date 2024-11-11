export interface Student {
    id: string;  
    created_at: string;  
    name: string;  
    surname: string;  
    birthday: string;  
    phone: string;  
    registration_no: string;  
    year: number;  
    degree: string;  
    branch: string;  
    club?: string[];  
    avatar: string;  
    event?: string[];  
    email: string;  
    user_id?: string;  
    gender: string; 
    midddlename?: string;  
  }
  
  export interface Club {
    id: number;                   
    created_at: string;            
    clubname: string;            
    logo: string;                  
    description: string;          
    leader: string;                
    leader_image: string;          
    leader_linkedin: string;       
    coleads?: string[];           
    coleads_image?: string[];      
    coleads_linkedin?: string[];   
    members?: string[];            
    members_image?: string[];      
    member_linkedin?: string[];    
  }
  