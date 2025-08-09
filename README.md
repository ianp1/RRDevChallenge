# Running the Application

## Using docker-compose
This is the easiest way to run the application.

Run `docker compose up -d --build` in root directory.
Frontend is reachable via port `8080`, backend via `3000`.

## Using angular / node cli
In case docker is not a viable option, run the following commands to setup:
```
cd frontend
npm install --include=dev
cd ..
cd backend
npm install --include=dev
```
Then run in two separate shells in root folder:
```
$ npm run backend
$ npm run frontend
```

Frontend is reachable via port `4200`, backend via `3000`.


# Considerations and Limitations

There are some limitations in this example. I want to discuss them here and provide insight in how to improve:

## Rate limits
The DB Backend seems to limit the number of requests pretty harshly. This results in error messages in frontend. The cached vendo client did raise some errors, that where not fixable quickly. In a real world scenario, i would investigate further and implement another caching solution in case the errors are not fixable.

Additionally, a graceful failing should be implemented, retrying the request with backoff could yield results without the user knowing. Fiddling with the debounce times in frontend could also reduce the number of requests. 

## Format validation
I used `runtypes` to specify expected types from backend and validate against them. Benefit is avoiding providing the type and aditionall schema for validation (e.g. with JSON schema), which would validate DRY. However, if validation fails this raises Errors in frontend, which should be avoided if anyhow possible. This problem can be mitigated with deeper understanding of the used library, so that the underlying data structure can be clearly described.

## Error handling and logging
I provided a very basic Error handling in frontend and logging in Backend. This could be improved upon. Especially error handling in frontend could be improved to display only the most recent error and graceful error handling as described above.
Also, telemetrics in frontend could improve maintainability 

## Dependency Incjection in Backend
I did not implement DI in backend yet. This would be useful for testing and to improve readability, especially considering Angular uses DI itself.

## Testing
Due to time constraints i have not implemented any tests. In a real world scenario this would be a must.

# Next Steps

Addtionally to the above improvements, some next ideas are:

- Browse the train lines of outgoing and incoming trains, with the option to inspect the other stations of the lines, too
- Make the start date for arrival / departure search adjustable as well -> This is already implemented, only a date input element is missing
- Add pagination to results

