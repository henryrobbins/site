---
id: cornell-covid-response
name: Cornell Covid Response
start: 2020-08-01
end: 2022-05-31
role: Data Scientist
company: Cornell University
projects: ["simpar", "cotat"]
github: cornell-covid-modeling
github_link: https://github.com/cornell-covid-modeling
---

In March 2020, I was sent home from Cornell amidst the Covid-19 pandemic.  I
eagerly awaited the university's decision for returning to campus in the fall.
In June, it was announced that Cornell would return to campus for a hybrid
semester. This decision to return was a result of the Cornell Modeling Team's
work led by [Peter Frazier][pf]. This [Forbes article][forbes] details how the
team discovered returning to campus was the safer option.  Given this decision,
the university had a challenging obstacle ahead: creating a class schedule for
Fall 2020.

The first hurdle in creating the class schedule was determining new room
capacities subject to the six foot social distancing requirement. This posed an
interesting optimization problem which an ORIE team led by Jody Zhu tackled.
More information on that effort can be found in [this article][seating]. In
August of 2020, I was asked to join the Cornell Course Roster Scheduling team
led by [David Shmoys][dbs], [Oktay Gunluk][ong], [David Williamson][dpw], and
[Brenda Dietrich][bld]. I aided in collecting course information and
preferences from over 80 academic departments to be fed in to an optimization
model designed by ORIE PhD student, [Conner Lawless][conner]. Afterwards, I led
the effort to manage department requests for changes to the fall course roster,
and developed the room assignment model for exams. More about these efforts can
be found in [this article][schedule]. The hard work of these teams led to
Cornell's ability to provide an in-person education for the Fall 2020 semester.
This [Bloomberg article][bloomberg] summarizes the victory.

In Fall 2021, I was asked to join a team of [Cornell ORIE][orie] faculty and
PhD students to advise Cornell leadership on the university's Covid-19
policies.  I developed the [cotat][cotat] Python package to visualize Cornell
contact tracing data. In December 2021, Cornell was the first university to see
Omicron cases on campus. See this [CNN article][cnn].  Visualizations created
by this tool were used in an internal report prepared by [Jaylen C. Perkins,
MPH][jcp] providing insight into spread during this surge. In January of 2022,
I led the development of [simpar][simpar], a Python package used to simulate
the spread of Covid-19 through a heterogeneous population. This tool was
central in generating predictions which directly informed Cornell's Spring 2022
policies and were used to advise administration throughout the spring semester.

[simpar]: https://github.com/cornell-covid-modeling/simpar
[cotat]: https://github.com/cornell-covid-modeling/cotat
[conner]: https://www.linkedin.com/in/connorlawless
[jcp]: https://www.linkedin.com/in/jaylen-c-perkins
[ong]: https://www.orie.cornell.edu/faculty-directory/oktay-gunluk
[dpw]: https://www.engineering.cornell.edu/faculty-directory/david-p-williamson
[bld]: https://www.engineering.cornell.edu/faculty-directory/brenda-lynn-dietrich
[dbs]: https://people.orie.cornell.edu/shmoys/
[pf]: https://people.orie.cornell.edu/pfrazier/
[seating]: https://www.orie.cornell.edu/news/orie-team-led-jody-zhu-takes-first-place-iise-undergraduate-research-competition
[schedule]: https://www.engineering.cornell.edu/spotlights/unsung-engineering-behind-cornells-fall-2020-schedule
[forbes]: https://www.forbes.com/sites/alexandrasternlicht/2020/06/30/cornell-says-its-safer-to-bring-students-back-to-campus-will-resume-classes-september-2/
[bloomberg]: https://www.bloomberg.com/news/articles/2020-10-28/cornell-chalks-up-rare-covid-19-containment-victory#xj4y7vzkg
[cnn]: https://www.cnn.com/2021/12/14/us/cornell-university-covid-cases/index.html
[orie]: https://www.orie.cornell.edu/orie
