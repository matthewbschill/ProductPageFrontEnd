# Title

  MSchill Design Products  

# Description

  React Front End SPA   
  utilizing:   
     React + TypeScript + Vite   
     Minimal API   
     Docker containers   
     Material UI (@mui) Template  
     Graph QL (@apollo/client) - utilized for pulling testimonials  
     Axios - utilized for checking of valid domain / email
     Public APIs:   
       Disify - for checking of valid domain / email   
       Mocky.io - temp hosting of mock data in ExampleTestimonials.json   
     Public Services:   
       cors-anywhere.herokuapp.com - temp proxy for cors for disify access     

# Notes / Future Enhancements
  Some possible future enhancements:   
     Implement additional functionality such as sign in / sign up / check out   
     Many of the styles in the MUI template used are in line - move some to css files.   
     Add items like Privacy Policy, Company, and Legal text for links in footer.   

# Building

  docker build -t productpagefrontend .   

  To run the container via command line, command would be similar to:   
  docker run -d -p 3000:80 --name productpagefrontend productpagefrontend   

  Can stop the container via docker desktop or via command:   
  docker stop productpagefrontend   

# Testing
  Once container is running,   
  can open: 'http://localhost:3000'   

  may need to access:   
  https://cors-anywhere.herokuapp.com/corsdemo   
  https://cors-anywhere.herokuapp.com/https://disify.com/api/email/   
  and enable temporary access to test the email check for the sign up access / subscribe access.   


