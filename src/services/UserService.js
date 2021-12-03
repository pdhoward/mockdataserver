import { BehaviorSubject } from 'rxjs';

const UserService = (backend) => {
  const backend = backend;
  this.currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
  );
  const currentUser = currentUserSubject.asObservable();
    window.addEventListener('storage', _listenForStorageChanges);
  }

 const  _listenForStorageChanges = (event) => {
    const nextUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(`In listenForStorageChanges. nextUser = ${nextUser}`);
    if (nextUser !== this.currentUserSubject.value) {
      this.currentUserSubject.next(nextUser);
    }
  }

  const currentUserValue = () => {
    return this.currentUserSubject.value;
  }

  const login = (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    return backend('/login', requestOptions)
      .then(this._handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);

        return user;
      });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
  };

  const _handleResponse = response => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from API
          logout();
          window.location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  };


export default UserService
