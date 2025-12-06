"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useApp } from "@/lib/context";
import { Modal } from "@/components/ui/Modal";

export default function FeedbackPage() {
    const { feedback, resolveFeedback } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    const handleReply = (item: any) => {
        setSelectedFeedback(item);
        setReplyText("");
        setIsModalOpen(true);
    };

    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Reply sent to ${selectedFeedback?.customerName}: "${replyText}"`);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Feedback & Complaints</h1>
                    <p className="text-sm text-gray-500">Listen to what your customers say</p>
                </div>
            </div>

            <div className="grid gap-4">
                {feedback.map((item) => (
                    <div key={item.id} className="rounded-xl bg-white p-6 card-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-saffron-50)] text-[var(--color-saffron-600)]">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{item.customerName}</h3>
                                    <div className="mt-1 flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-xs text-gray-500">{item.date}</span>
                                    </div>
                                    <p className="mt-3 text-gray-600">{item.comment}</p>
                                </div>
                            </div>
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
                            <button onClick={() => handleReply(item)} className="text-sm font-medium text-blue-600 hover:underline">Reply</button>
                            {item.status !== 'Resolved' && (
                                <button onClick={() => resolveFeedback(item.id)} className="text-sm font-medium text-green-600 hover:underline">Mark as Resolved</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Reply to ${selectedFeedback?.customerName}`}
            >
                <form onSubmit={sendReply} className="space-y-4">
                    <div>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm h-32"
                            placeholder="Type your reply here..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-navy-blue)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                            Send Reply
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
