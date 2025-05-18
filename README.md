### Brief Explanation of Solution
I ended up just going with using DataTables that's part of shadcn/ui since Laravel 12 comes with it naturally. So I felt there was no need to actualyl re-invent the wheel there when an existing solution already exists. I used `dummyjson` as well for the actual UI since it was a lot easier than working with dummy mock data that I have to write up myself.

Another thing I considered was to add pagination. This came with its own challenges, but I think for the most part it worked out great. While it wasn't a requirement, normally data like these are paginated so I thought I'd add it in anyways!

As for the 'View' action. Went with a Dialog that's also taken care of by `shadcn`. I like this approach more than doing a full page load since it's a lot less overhead.

### Installation Instruction
Since this is using Laravel 12 + React Starter Kit. So following the installation instruction from Laravel is what is needed to run this application.

### Live Demo
For convenience, I have this link ready to easily view the project: https://reactuserpanel.josephchua.dev/