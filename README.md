# IPFS Proxy ApiKey Manager

This application allows you to start an IPFS Node and access it through a proxy server, protected via an api-key in its headers.
The api key creation and enabling is done through the application's front-end, which allows the user to log in, create new and toggle keys.
Every successfull request through the proxy is logged under the used key and the user is able to check every request made for each api-key in the front-end.
## Pre-requisites
- Docker (https://docs.docker.com/engine/install/)
- Docker-compose (https://docs.docker.com/compose/install/)
- Git [debian](`sudo apt-get install git`)
# Startup
1. Clone this repository `git clone https://github.com/tomiir/ipfs-proxy-keys.git`
2. Navigate to the cloned folder and execute `docker-compose up --build -d`. This will start the IPFS node, the proxy server, the back-end and the frontend in the background.  

## Front-end
The front-end should be exposed at `localhost:3000`.


### Login
A default user is created at build time with the following credentials:
- Email: test@test.com
- Password: Test1234


(Note: These credentials are configured in `/back/.env` as environment variables and can be changed before building the container.)


Using the provided credentials, the user can log into the application, and can use the button to create a new api-key and saveit in the database.

### Active checkbox
Each key has a checkbox that indicates if it is active or not and the user is able to toggle each key's state. *Any active key will allow requests through the proxy.*

### Dropdown
There is a dropdown for each key that, when clicked, expands into a table containing all the requests made with the corresponding key.


## Proxy
The proxy should be exposed at `localhost:5000`.

Each request that arrives to the proxy is scanned for a valid api-key. If found, the request data is added to the key's record list in the db and it is forwarded to the ipfs api. 


## Back
The back-end should be exposed at `localhost:8080` but only communicates with the front-end.

### Tests
1. `docker exec -it back /bin/bash`
2. `npm test`

## Questions 
### How would you improve this assignment for a production ready solution (e.g. security, deployment)?

There is plenty of room for improvement in this solution. Starting with security, there are some serious flaws. First, the back-end is not protected in any way, no api-key is used and no authentication other than the login's JWT is used, so in a production environment, anyone with the api's url might interact with the services in a malicious way. Another big issue in the back-end server is parameter sanitization. No sanitization is done, and this might allow a NoSQL injection into the system. 
The proxy is not without flaws either. The NoSQL injection problem applies here as well, since the proxy logs the request data without verifying it into the DB. 

The api-key is generation and validation could be improved as well. Any key is accepted as a valid one, no format is required for its creation and this is quite dangerous since we could set up insecure api-keys and exposing our node. 
Regarding deployment, the application is dockerized, but no CI/CD pipeline was configured. A pipeline should be configured so that tests are run on each commit, and deploy when merges towards main or other protected branches succeed. 

Finally, environment variables should not be exposed as plain text in the code. Ideally we would have a secrets vault where we would store the secrets and fetch them from there at build time in the deployment pipeline.

### Describe IPFS and compare it to other protocols (e.g. HTTP)
IPFS is a peer-to-peer hypermedia protocol. As HTTP, it's a protocol that allows data transfer, but instead of having all information stored in a single server, IPFS proposes a decentralized approach where data is stored, fetched and transfered from multiple nodes of the network. IPFS files are stored in the nodes as a hash of their content, so if the file content changes, the hash automatically changes. We don't look for the _file server address_ but rather for the _file content hash_. 

This approach has many other differences with HTTP. For example, in HTTP, if the server that is serving a file is down, or even if any intermediary between such server and the client is down, the client would never be able to access such file. Instead in IPFS, as the file is stored by multiple nodes in the network, any node hosting the file would be able to transfer it to anyone requesting it. 

Assuming a dense (lots of nodes / much more public acceptance) IPFS network, transfer times would be reduced since the content you're looking for should be in a node near you instead of on the other side of the world like in HTTP. By addressing content directly, IPFS is able to decouple the content from where it was created / published and cache it infinitely. Each node can have a cached version of a file, that might be outdated, but is still accessible by its hash. 

