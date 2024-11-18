# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Posts::ReportsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @post = create(:post, author: @user)
    @creator_headers = headers(@user)
  end

  def test_should_create_pdf_report_for_given_post
    pdf_report_path = Rails.root.join("tmp/post_pdf_report.pdf")

    Sidekiq::Testing.inline!
    post report_path, params: { post: { slug: @post.slug } }, headers: @creator_headers

    assert File.exist?(pdf_report_path)
    File.delete(pdf_report_path) if File.exist?(pdf_report_path)
  end

  def test_should_download_pdf_report_if_pdf_report_exists
    pdf_report_path = Rails.root.join("tmp/post_pdf_report.pdf")

    Sidekiq::Testing.inline!
    post report_path, params: { post: { slug: @post.slug } }, headers: @creator_headers

    get download_report_path, params: { response_type: "blob" }, headers: @creator_headers

    assert_response :success

    assert_equal "application/pdf", response.content_type

    assert_includes response.headers["Content-Disposition"], "attachment"
    File.delete(pdf_report_path) if File.exist?(pdf_report_path)
  end

  def test_should_return_not_found_if_report_file_does_not_exist
    pdf_report_path = Rails.root.join("tmp/post_pdf_report.pdf")
    File.delete(pdf_report_path) if File.exist?(pdf_report_path)

    Sidekiq::Testing.inline!
    get download_report_path, params: { response_type: "blob" }, headers: @creator_headers

    assert_response :not_found
    assert_includes response.body, I18n.t("not_found", entity: "report")
  end
end
