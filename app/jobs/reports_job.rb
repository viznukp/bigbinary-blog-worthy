# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(user_id, slug, report_path)
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })
    post = Post.find_by(slug:)
    content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/report/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.finished"), progress: 100 })
  end
end
