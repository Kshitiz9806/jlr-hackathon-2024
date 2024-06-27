from src.task_assignment import *

from src.views.skill_view import Skills
from src.views.sprint_view import Sprint
from src.views.sprint_view import Story
from src.views.squad_view import Squad
from src.views.squad_view import Employee

# def __main__():
skill1 = [1,1,0,0]
skill2 = [0,0,1,1]
# print(skillmatrix)

story1 = Story("AEX-1", 3, skill2)
story2 = Story("AEX-2", 6, skill1)
story3 = Story("AEX-3", 3, skill1)
story_list = [story1, story2, story3]
sprint = Sprint("PI1_S1", story_list)

emp1 = Employee("kanand", skill1)
emp2 = Employee("asriva", skill2)
emp_list = [emp1, emp2]
sota_squad = Squad("SOTA", emp_list)

out = skill_based_matching_algorithm(sota_squad, sprint, 6)
print(out)
