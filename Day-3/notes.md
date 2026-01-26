API :
    Application programming interface(API) , is a set of rule and protocols that enable different programs to communicate and exchange data with each other

REST APIs :
    REST (Representational State Transfer) is an architectural style for designing
    networked applications. It relies on stateless, client-server communication over
    HTTP using standard methods and status codes. RESTful APIs are designed
    around resources, which can be anything from users and products to
    documents

middleware :
    which helps the server to read the req.body
    >>>  app.use(express.json()) 

HTTP Methods:
    HTTP methods define the action you want to perform on a resource. Here are
    the most common methods:

1 > GET :
Retrieves a resource or a list of resources. Should
not modify data on the server.

2 > POST :
Creates a new resource. The request body contains
the data for the new resource.

3 > PUT :
Updates a resource by replacing it with new data.
Requires complete new representation in the
request body.


4 > PATCH :
Updates a resource by partially modifying it.
Requires only the modified fields in the request
body

5 > DELETE:
 Deletes a resource

