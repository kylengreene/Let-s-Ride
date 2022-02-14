# Capstone: Let's Ride

## Problem Statement

Cycling groups across the world host **group rides** that are open to the public. Group rides range from an impromptu weekend run around the lake to a formal event (generate interest in the club, say thank you to friends, family, and sponsors, celebrate an occasion, etc). The important thing is that anyone can join a group run. You don't have to be a running club member.

Group run discovery is difficult. Some running clubs post a message on their home page. Others post on social media. Still others don't post anything at all and hope that word-of-mouth will spread the message. When clubs do post a message, it's usually not on a formal calendar or easy to find on a map. It's not clear if the run has already occurred.

Worse, there's no easy way to sign up for a group run. Clubs never know who will show up. If a group run is limited, it's embarrassing when too many people show up. It's also a little embarrassing when no one shows up.

## Proposal

Create an application for posting group runs on a formal calendar. Make it easy to sign up for runs.

### Scenario 1

Emma is vacationing in Austin for two weeks. She wants to relax and enjoy her vacation, but she also wants to keep up on her running. Running helps her relax. She uses the *Group Run* application to quickly search for runs during her two-week window, located in Austin. She signs up for one or two. Running clubs in Austin know the best routes and she gets a chance to meet new people.

### Scenario 2

Kelsey isn't a member of a running club, he's not ready for that commitment, but he does like to run with a group once in a while. Each weekend, he uses the *Group Run* application to browse runs near his Chicago neighborhood. If it feels right, he signs up and runs. There are a few running clubs near him. He doesn't have to join a club. He can pick and choose only the runs that interest him.

## Vocabulary

<dl>
<dt>Cycling Club</dt>
<dd>An organization based on a shared love of running. Clubs have members. They host runs. Some are informal with infrequent runs. Others are large, have budgets, and charge membership fees.</dd>
<dt>Rider</dt>
<dd>Anyone who signs up for a run. Runners can be members of a club, but don't have to be. All members are runners but not all runners are members.</dd>
<dt>Member</dt>
<dd>A runner who is formally affiliated with a running club. A runner can be a member of more than one club.</dd>
<dt>Club Admin</dt>
<dd>A running club member with an administrator role. They have more privileges in the Group Run application. All admins are members, but not all members are admins.</dd>
<dt>Ride</dt>
<dd>A running event with a specific time, date, and location. A run may also include a route (stretch goal).</dd>
</dl>

## Technical Requirements

1. Relational database
2. Spring Boot, MVC, JdbcTemplate, Testing
3. React UI
4. Sensible layering and pattern choices
5. A full test suite that covers the domain and data layers
6. Deployment to AWS using EC2.

### Security Requirements

Group Run has two formal roles: MEMBER and ADMIN. 

In addition, runners must register before they can sign up for a run. A registered runner has no role. They are only authenticated, but that's enough to distinguish between them and a public user.

In effect, there are four levels of authorization. 

Actions that are available to:
- everyone (public)
- any authenticated user (anyone with a login)
- the MEMBER role
- the ADMIN role

Application concepts (*Runner*, *Member*) may also represent security concepts.

## High-level Requirements

- Create a run (MEMBER, ADMIN).
- Edit a future run (MEMBER, ADMIN).
- Cancel a future run (ADMIN).
- Approve a run (ADMIN).
- Browse runs (anyone).
- Sign up for a run (authenticated).
- Apply for membership (authenticated).
- Approve a membership (ADMIN).

## Scenarios

Even though the application domain is provided, there's considerable flexibility in implementation. You must decide which data to track, how it's related, and the rules surrounding it.

Not all scenarios are covered. For example, Register, Log In, and Log Out are not explicitly detailed. You must decide how to handle those scenarios. You must also decide how navigation and UIs differ per role. (The public has a different UI than Runners who have a different UI than Members who have a different UI than Club Admins.)

### Create a Run

Create a run that runners can join.

Suggested data:
- brief description (e.g. "Saturday run along the river road.")
- date and time (must be in the future)
- a location (choose a level of difficulty from a single address field to a separately-tracked data entity)
- running club identifier (runs are always attached to a club. If a runner belongs to more than one club, they may need to choose)
- max participants (`null` for unlimited?)
- a route (data from a map integration, if appropriate)

**Precondition**: User must be logged in with the MEMBER or ADMIN role.

**Post-condition**: If the user is a MEMBER, the run is not automatically posted. It must be approved by an ADMIN. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.

### Edit a Run

Can only edit a run in the future.

**Precondition**: User must be logged in with the MEMBER or ADMIN role. Run datetime must be in the future.

**Post-condition**: If the user is a MEMBER, the run is set to a pending status even if it was initially posted. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.

### Cancel a Run

Can only cancel a run in the future.

**Precondition**: User must be logged in with the ADMIN role. Run datetime must be in the future.

**Post-condition**: Data is not deleted. The run is set to a canceled status and is no longer visible in the public UI. It *is* visible to the admin.

### Approve a Run

Through an administrative UI, the ADMIN user finds pending runs for their club. They can choose to: post directly, edit and post, or cancel.

**Precondition**: User must be logged in with the ADMIN role.

**Post-condition**: None

### Browse Runs

Decide how to display runs to anyone who uses the application.

- Text-based: Users filter by date and location. Display results as HTML with action UI to sign up.
- Calendar-based: Users page through a calendar UI. Limit by location or manage the UI so there's not 200 runs on a single day.
- Map-based: Users navigate to different locations to see future runs as pins on the map.

**Precondition**: None

**Post-condition**: None

### Sign Up for a Run

Once a runner finds a run they're interested in, they can sign up.

**Precondition**: User must be logged in. The run must not be over-capacity. The runner cannot already be registered for the run.

**Post-condition**: Runner is registered for the run.

### Apply for Membership 

If a runner enjoys a club's runs, they may wish to join the club. Give them an easy way to apply for membership.

**Precondition**: User must be logged in. The user cannot already be a member of the club.

**Post-condition**: Membership is in a pending status waiting for ADMIN approval.

### Approve a Membership 

Through an administrative UI, the ADMIN user finds pending memberships for their club. They can choose to accept or reject the membership application.

**Precondition**: User must be logged in with the ADMIN role.

**Post-condition**: Data is not deleted. The membership is set to a rejected status. This prevents the runner from applying again and again.

## Notes

- A Runner can be a Member of many Clubs.
- A Runner can be a Club Admin for one and only one Club.
- Runs are always associated to a Club. 
- Any Runner can sign up for any Run as long as it's not at capacity. Members aren't limited to Runs sponsored by their Clubs.
- Runners cannot create Runs. Only Members (and therefore Admins) can create Runs.
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

Planning is absolutely essential for a project this large. Create a complete list of concrete tasks required to finish. Tasks should take no longer than 4 hours. Schedule each task for a specific day. At the end of each day, take stock. Are you ahead of schedule, on schedule, or behind? If ahead, how can you put the extra time to use? 

If behind, what do you have to adjust to complete the project? Don't just hope that things will improve. Take concrete steps to simplify or remove features.

Test as you go. If you wait to test until the end, three things happen:
1. Your tests aren't as good.
2. The last bit of development becomes a slog. No one loves 100% testing. Spread the testing out over several days.
3. You gain false confidence because you don't see domain failures that are prevented in the UI. Remember, if we throw away the UI, the domain should still prevent all invalid transactions.

### The "Spec"

This document has the appearance of a formal specification, but it is not. There are too many missing pieces. It's up to you to complete the specification. When things aren't clear, ask clarifying questions. Your classmates and instructors are invaluable resources. Never make assumptions.

If you can't resolve an ambiguous requirement, ask your instructor for feedback.

## Deliverables

1. A schedule of concrete tasks (at most 4 hours per task) that represent all work required to finish your project along with task statuses
2. Diagrams: database schema, class, layer, flow
3. Wireframes: roughly sketch your UI and how one view transitions to another. You can also use design tools to create wireframes.
4. A short presentation, 4 to 6 slides, describing who you are, how you found programming, and your project
5. Complete project source code free of compiler errors
6. A schema creation script along with any DML for data needed to run the application (security roles, default data, etc)
7. If it isn't straight-forward, instruction to set up and run your application
8. A complete test suite with all tests passing
