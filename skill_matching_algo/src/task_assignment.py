import numpy as np
from functools import cmp_to_key

from src.views.skill_view import Skills
from src.views.sprint_view import Sprint
from src.views.sprint_view import Story
from src.views.squad_view import Squad
from src.views.squad_view import Employee

def skill_cost_evaluator(user_skill, required_skill):
  total_cost = 0.00
  for skill in Skills:
    if(required_skill[skill] > user_skill[skill]):
      total_cost += ( required_skill[skill] - user_skill[skill] )**2
  total_cost = total_cost**0.5
  return total_cost

def evaluate_skill_cost_matrix(squad, sprint):
  no_of_employees = len(squad.employee_list)
  no_of_tasks = len(sprint.stories)
  skill_cost_matrix = np.full((no_of_employees, no_of_tasks), 0.00)
  for i in range(no_of_employees):
    for j in range(no_of_tasks):
      skill_cost_matrix[i][j] = skill_cost_evaluator(squad.employee_list[i].skill_vector, sprint.stories[j].skill_vector)
  return skill_cost_matrix

def story_comparator(story1, story2):
  return story2.story_point - story1.story_point

def skill_based_matching_algorithm(squad, sprint, max_bandwidth):
  sprint.stories.sort(key=cmp_to_key(story_comparator))
  no_of_employees = len(squad.employee_list)
  no_of_tasks = len(sprint.stories)
  employee_bandwidth = np.full(no_of_employees, max_bandwidth)
  skill_cost_matrix = evaluate_skill_cost_matrix(squad, sprint)
  
  final_assignment = dict()
  for employee in squad.employee_list:
    final_assignment[employee.cdsid] = []
  
  for i in range(no_of_tasks):
    best_user = -1
    best_cost = 1000000.00
    story = sprint.stories[i]
    for j in range(no_of_employees):
      if story.story_point <= employee_bandwidth[j]:
        if best_cost > skill_cost_matrix[j][i]:
          best_cost = skill_cost_matrix[j][i]
          best_user = j
    if best_user != -1:
      employee_bandwidth[best_user] -= story.story_point
      final_assignment[squad.employee_list[best_user].cdsid].append(story.story_id)
  
  return final_assignment
