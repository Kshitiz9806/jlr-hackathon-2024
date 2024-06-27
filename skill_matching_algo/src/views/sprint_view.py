
class Story:

  def __init__(self, story_id, story_point, skill_vector):
    self.story_id = story_id
    self.story_point = story_point
    self.skill_vector = skill_vector

class Sprint:
  
  def __init__(self, sprint_name, stories):
    self.sprint_name = sprint_name
    self.stories = stories
