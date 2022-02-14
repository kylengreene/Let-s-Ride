# Capstone: Let's Ride

## Problem Statement

Cycling groups across the world host **group rides** that are open to the public. Group rides range from an impromptu weekend rip around the lake to a formal event (generate interest in the club, say thank you to friends, family, and sponsors, celebrate an occasion, etc). The important thing is that anyone can join a group ride. You don't have to be a Cycling club member.

Group ride discovery is difficult. Some cycling clubs post a message on their home page. Others post on social media. Still others don't post anything at all and hope that word-of-mouth will spread the message. When clubs do post a message, it's usually not on a formal calendar or easy to find on a map. It's not clear if the ride has already occurred.

Worse, there's no easy way to sign up for a group trips. Clubs never know who will show up. If a group ride is limited, it's embarrassing when too many people show up. It's also a little embarrassing when no one shows up.

## Proposal

Create an application for posting group rides on a formal calendar. Make it easy to sign up for rides.

### Scenario 1

Emma is vacationing in Austin for two weeks. She wants to relax and enjoy her vacation, but she also wants to keep up on her cycling. Riding helps her relax. She uses the *Let's Ride* application to quickly search for rides during her two-week window, located in Austin. She signs up for one or two. Cycling clubs in Austin know the best routes and she gets a chance to meet new people.

### Scenario 2

Kelsey isn't a member of a cycling club, he's not ready for that commitment, but he does like to ride with a group once in a while. Each weekend, he uses the *Let's Ride* application to browse rides near his Chicago neighborhood. If it feels right, he signs up and rides. There are a few cycling clubs near him. He doesn't have to join a club. He can pick and choose only the rides that interest him.

## Vocabulary

<dl>
<dt>Cycling Club</dt>
<dd>An organization based on a shared love of cycling. Clubs have members. They host rides. Some are informal with infrequent rides. Others are large, have budgets, and charge membership fees.</dd>
<dt>Rider</dt>
<dd>Anyone who signs up for a ride. riders can be members of a club, but don't have to be. All members are riders but not all riders are members.</dd>
<dt>Member</dt>
<dd>A rider who is formally affiliated with a cycling club. A rider can be a member of more than one club.</dd>
<dt>Club Admin</dt>
<dd>A cycling club member with an administrator role. They have more privileges in the Let's Ride application. All admins are members, but not all members are admins.</dd>
<dt>Ride</dt>
<dd>A cycling event with a specific time, date, and location. A ride may also include a route (stretch goal).</dd>
</dl>

## Technical Requirements

1. Relational database
2. Spring Boot, MVC, JdbcTemplate, Testing
3. React UI
4. Sensible layering and pattern choices
5. A full test suite that covers the domain and data layers
6. Deployment to AWS using EC2.

### Security Requirements

Let's Ride has two formal roles: MEMBER and ADMIN. 

In addition, riders must register before they can sign up for a ride. A registered rider has no role. They are only authenticated, but that's enough to distinguish between them and a public user.

In effect, there are four levels of authorization. 

Actions that are available to:
- everyone (public)
- any authenticated user (anyone with a login)
- the MEMBER role
- the ADMIN role

Application concepts (*rider*, *Member*) may also represent security concepts.

## High-level Requirements

- Create a ride (MEMBER, ADMIN).
- Edit a future ride (MEMBER, ADMIN).
- Cancel a future ride (ADMIN).
- Approve a ride (ADMIN).
- Browse rides (anyone).
- Sign up for a ride (authenticated).
- Apply for membership (authenticated).
- Approve a membership (ADMIN).

## Scenarios

### Create a ride

Create a ride that riders can join.

Suggested data:
- brief description (e.g. "Saturday ride along the river road.")
- date and time (must be in the future)
- a location (choose a level of difficulty from a single address field to a separately-tracked data entity)
- cycling club identifier (rides are always attached to a club. If a rider belongs to more than one club, they may need to choose)
- max participants (`null` for unlimited?)
- a route (data from a map integration, if appropriate)

**Precondition**: User must be logged in with the MEMBER or ADMIN role.

**Post-condition**: If the user is a MEMBER, the ride is not automatically posted. It must be approved by an ADMIN. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.

### Edit a ride

Can only edit a ride in the future.

**Precondition**: User must be logged in with the MEMBER or ADMIN role. ride datetime must be in the future.

**Post-condition**: If the user is a MEMBER, the ride is set to a pending status even if it was initially posted. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.

### Cancel a ride

Can only cancel a ride in the future.

**Precondition**: User must be logged in with the ADMIN role. ride datetime must be in the future.

**Post-condition**: Data is not deleted. The ride is set to a canceled status and is no longer visible in the public UI. It *is* visible to the admin.

### Approve a ride

Through an administrative UI, the ADMIN user finds pending rides for their club. They can choose to: post directly, edit and post, or cancel.

**Precondition**: User must be logged in with the ADMIN role.

**Post-condition**: None

### Browse rides

Decide how to display rides to anyone who uses the application.

- Text-based: Users filter by date and location. Display results as HTML with action UI to sign up.
- Calendar-based: Users page through a calendar UI. Limit by location or manage the UI so there's not 200 rides on a single day.
- Map-based: Users navigate to different locations to see future rides as pins on the map.

**Precondition**: None

**Post-condition**: None

### Sign Up for a ride

Once a rider finds a ride they're interested in, they can sign up.

**Precondition**: User must be logged in. The ride must not be over-capacity. The rider cannot already be registered for the ride.

**Post-condition**: rider is registered for the ride.

### Apply for Membership 

If a rider enjoys a club's rides, they may wish to join the club. Give them an easy way to apply for membership.

**Precondition**: User must be logged in. The user cannot already be a member of the club.

**Post-condition**: Membership is in a pending status waiting for ADMIN approval.

### Approve a Membership 

Through an administrative UI, the ADMIN user finds pending memberships for their club. They can choose to accept or reject the membership application.

**Precondition**: User must be logged in with the ADMIN role.

**Post-condition**: Data is not deleted. The membership is set to a rejected status. This prevents the rider from applying again and again.

## Notes

- A rider can be a Member of many Clubs.
- A rider can be a Club Admin for one and only one Club.
- rides are always associated to a Club. 
- Any rider can sign up for any ride as long as it's not at capacity. Members aren't limited to rides sponsored by their Clubs.
- riders cannot create rides. Only Members (and therefore Admins) can create rides.
- 
## Technical Learning Goals

- Google Maps
- Strava API
- A third-party calendar UI

## Deployment

- use RDS for persistent data storage
- use EC2 for the API
- use EC2 for the front-end application

## Approach

The first step is to creat a complete list of concrete tasks required to reach MVP. Tasks should take no longer than 4 hours. Each day will begin with a standup to asses progress, address blockers, and asign tasks for that work day. 

Branches and version control are integral to the success of this project. Brnahcing and peer reviewed merges will be used to ensure a cohesive and functional product. 

This project will have test driven development. It is our intent to create functional tests at each juncture and sue them to effectively evalute our product as we go. 


## Deliverables

1. A schedule of concrete tasks (at most 4 hours per task) that represent all work required to finish your project along with task statuses. (This will be tracked through Trello)
2. Diagrams: database schema, class, layer, flow
3. Wireframes the explaining the flow and transitions of the different views. 
4. A capstone presentation, describing who you are, how you found programming, and your project
5. Complete project source code free of compiler errors
6. A schema creation script along with any DML for data needed to ride the application (security roles, default data, etc)
7. If it isn't straight-forward, instruction to set up and ride your application
8. A complete test suite with all tests passing
