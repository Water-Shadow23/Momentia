

export const tabs = [
    {
     key:'posts',
     location:'/accaunts',
     className:(activeKey)=>(`profile-box-head ${activeKey === 'posts' ? 'profile-box-active' : ''}`), 
     children:(
      <>
       <span className="material-symbols-outlined">grid_on</span>
       <p>Posts</p>
      </>
     )  
    },
    {
    key:'saved',
    location:'/accaunts/saved',
    className:(activeKey)=>(`profile-box-head ${activeKey === 'saved' ? 'profile-box-active' : ''}`),  
    children:(
      <>
      <i className="fa-regular fa-bookmark"></i>
      <p>Saved</p>
      </>
    )
  }
  ];