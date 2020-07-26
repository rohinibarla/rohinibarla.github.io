require 'html/proofer'

class Deploy < Thor
  include Thor::Actions
  
  desc "thor", "proof HTML"
  def proofer
    ::HTML::Proofer.new("./_site").run
  end

end
