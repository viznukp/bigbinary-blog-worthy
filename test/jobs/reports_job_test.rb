# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class ReportsJobTest < ActiveJob::TestCase
  def setup
    @user = create(:user)
    @post = create(:post, author: @user)
  end

  def test_file_created
    pdf_report_path = Rails.root.join("tmp/post_pdf_report.pdf")

    Sidekiq::Testing.inline!
    ReportsJob.new.perform(@user.id, @post.slug, pdf_report_path)

    assert File.exist?(pdf_report_path), "Expected the PDF report to be created, but it wasn't."
  end
end
