

export default function configureSSO() {
  console.log('Initializing keycloak');
  const keycloak = {mock: 'success'}
 
  console.log(keycloak);
  localStorage.setItem('currentUser', JSON.stringify(keycloak.idTokenParsed));
   
}
